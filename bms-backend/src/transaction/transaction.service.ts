import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { DatabaseService } from "src/database/database.service";
import { Prisma } from "@prisma/client";
import { generateTransactionID } from "src/utils/helpers";
import { Pagination } from "src/global-validators";
import { RecieptService } from "src/reciept/reciept.service";
import { BudgetService } from "src/budget/budget.service";
import { visibleFields } from "src/user/user.service";

@Injectable()
export class TransactionService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly recieptService: RecieptService,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
    creatorId: string,
    budgetId: string,
  ) {
    const budget = await this.databaseService.budget.findFirst({
      where: {
        id: budgetId,
      },
      include: {
        owner: true,
        members: {
          where: {
            userId: creatorId,
          },
        },
      },
    });

    if (!budget) throw new NotFoundException("Budget does not exist");

    if (budget.owner.id !== creatorId && budget.members.length === 0) {
      throw new BadRequestException("Not authorized to create transaction");
    }

    if (budget.endAt < new Date()) {
      throw new BadRequestException("Budget has reached end date");
    }

    const balance = budget.amount -
      (await this.getTotalBudgetExpenses(budgetId));

    if (balance < createTransactionDto.amount) {
      throw new BadRequestException("Insufficient funds in budget");
    }

    if (budget.isFrozen) throw new BadRequestException("Budget is frozen");

    const transactionId = generateTransactionID();
    return this.databaseService.transaction.create({
      data: {
        ...createTransactionDto,
        creator: {
          connect: {
            id: creatorId,
          },
        },
        budget: {
          connect: {
            id: budgetId,
          },
        },
        transactionId,
      },
    });
  }

  async findBudgetTransactions(
    budgetId: string,
    pagination?: Pagination,
    startDate?: Date,
    endDate?: Date,
    status?: Prisma.EnumTransactionStatusFilter,
  ) {
    const filter: any = {
      budgetId,
    };

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.gte = startDate;
      }
      if (endDate) {
        filter.createdAt.lte = endDate;
      }
    }

    if (status) {
      filter.status = status;
    }

    const budget = await this.databaseService.budget.findUnique({
      where: { id: budgetId },
    });

    if (!budget) throw new NotFoundException("Budget does not exist");

    return this.databaseService.transaction.findMany(
      {
        where: filter,
        select: {
          id: true,
          purpose: true,
          transactionId: true,
          status: true,
          amount: true,
          createdAt: true,
          creator: {
            select: visibleFields,
          },
        },
        skip: pagination.skip,
        take: pagination.limit,
      },
    );
  }

  async findUserTransactions(
    userId: string,
    pagination?: Pagination,
    startDate?: Date,
    endDate?: Date,
    status?: Prisma.EnumTransactionStatusFilter,
  ) {
    const filter: any = {
      creatorId: userId,
    };

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.gte = startDate;
      }
      if (endDate) {
        filter.createdAt.lte = endDate;
      }
    }

    if (status) {
      filter.status = status;
    }

    return this.databaseService.transaction.findMany({
      where: filter,
      skip: pagination.skip,
      take: pagination.limit,
    });
  }

  async findOne(id: string) {
    const transaction = await this.databaseService.transaction.findUnique(
      {
        where: { id },
        include: {
          reciept: {
            include: {
              file: true,
            },
          },
          creator: {
            select: visibleFields,
          },
        },
      },
    );
    if (!transaction) throw new NotFoundException("Transaction not found");
    return transaction;
  }

  async findUserHandledTransactions(
    userId: string,
    pagination: Pagination,
    startDate?: Date,
    endDate?: Date,
    status?: Prisma.EnumTransactionStatusFilter,
  ) {
    const filter: any = {
      handlerId: userId,
    };

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.gte = startDate;
      }
      if (endDate) {
        filter.createdAt.lte = endDate;
      }
    }

    if (status) {
      filter.status = status;
    }

    return this.databaseService.transaction.findMany({
      where: filter,
      skip: pagination.skip,
      take: pagination.limit,
    });
  }

  // update(id: string, updateTransactionDto: UpdateTransactionDto) {
  //   return this.databseService.transaction.update(
  //     {
  //       where: { id },
  //       data: updateTransactionDto,
  //     },
  //   );
  // }

  async getTransactionBudget(id: string) {
    return this.databaseService.transaction.findUnique({
      where: { id },
      select: {
        budget: true,
      },
    });
  }

  async isUserTransactionBudgetOwner(id, userId) {
    return this.databaseService.transaction.findUnique({
      where: {
        id,
        budget: {
          owner: {
            id: userId,
          },
        },
      },
    });
  }

  async isUserTransactionBudgetAdmin(id, userId) {
    return this.databaseService.transaction.findUnique({
      where: {
        id,
        budget: {
          admins: {
            some: {
              userId,
            },
          },
        },
      },
    });
  }

  async isUserTransactionBudgetMember(id, userId) {
    return this.databaseService.transaction.findUnique({
      where: {
        id,
        budget: {
          members: {
            some: {
              userId,
            },
          },
        },
      },
    });
  }

  async approveTransaction(id: string, handlerId: string) {
    const transaction = await this.databaseService.transaction.findUnique({
      where: { id },
      include: {
        budget: {
          include: {
            owner: true,
            admins: {
              where: {
                userId: handlerId,
              },
            },
          },
        },
      },
    });

    if (!transaction) throw new NotFoundException("Transaction does not exist");

    if (
      handlerId !== transaction.budget.owner.id &&
      transaction.budget.admins.length === 0
    ) {
      throw new UnauthorizedException("Admin access required");
    }

    if (transaction.status !== "PENDING") {
      throw new BadRequestException(
        `Transaction has been ${transaction.status}`,
      );
    }

    return this.databaseService.transaction.update({
      where: { id },
      data: {
        status: "APPROVED",
        handler: {
          connect: {
            id: handlerId,
          },
        },
      },
    });
  }

  async rejectTransaction(id: string, handlerId: string) {
    const transaction = await this.databaseService.transaction.findUnique({
      where: { id },
      include: {
        budget: {
          include: {
            owner: true,
            admins: {
              where: {
                userId: handlerId,
              },
            },
          },
        },
      },
    });

    if (!transaction) throw new NotFoundException("Transaction not found");

    if (
      transaction.budget.admins.length === 0 &&
      transaction.budget.owner.id !== handlerId
    ) {
      throw new UnauthorizedException("Admin access required");
    }

    if (transaction.status !== "PENDING") {
      throw new BadRequestException("Transaction is not pending");
    }

    return this.databaseService.transaction.update({
      where: { id },
      data: {
        status: "REJECTED",
        handler: {
          connect: {
            id: handlerId,
          },
        },
      },
    });
  }

  async validateTransaction(
    id: string,
    file: Express.Multer.File,
    handlerId: string,
  ) {
    const transaction = await this.databaseService.transaction.findUnique({
      where: { id },
      include: {
        budget: {
          include: {
            owner: true,
            admins: {
              where: {
                userId: handlerId,
              },
            },
          },
        },
      },
    });
    if (!transaction) throw new NotFoundException("Transaction does not exist");
    if (transaction.status === "VALIDATED") {
      throw new BadRequestException("Transaction has already been validated");
    } else if (transaction.status !== "APPROVED") {
      throw new BadRequestException(
        "Transaction must be approved before validation",
      );
    }
    const reciept = await this.recieptService.create(transaction.id, file);

    return this.databaseService.transaction.update({
      where: { id },
      include: {
        reciept: {
          include: {
            file: true,
          },
        },
      },
      data: {
        status: "VALIDATED",
        reciept: {
          connect: {
            id: reciept.id,
          },
        },
      },
    });
  }

  async getAvgExpensePerUser(id: string) {
    const transactionsGroupedByUser = await this.databaseService.transaction
      .groupBy({
        by: "creatorId",
        where: {
          budget: {
            id,
          },
        },
        _sum: { amount: true },
      });
    const totalPerUser = transactionsGroupedByUser.map((group) =>
      group._sum.amount
    );
    const averageExpenditure =
      totalPerUser.reduce((sum, amount) => sum + amount, 0) /
      totalPerUser.length;

    return averageExpenditure;
  }

  async getTotalBudgetExpenses(
    id: string,
    startDate?: Date,
    endDate?: Date,
    include: Prisma.EnumTransactionStatusFilter[] = [],
  ) {
    const filter_or: any = [];
    const filter: any = {
      budget: {
        id,
      },
    };

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.gte = startDate;
      }
      if (endDate) {
        filter.createdAt.lte = endDate;
      }
    }

    include = include.length
      ? include
      : ["APPROVED", "VALIDATED"] as Prisma.EnumTransactionStatusFilter[];

    include.map((status) => {
      filter_or.push({
        status: status.toString(),
      });
    });

    return (await this.databaseService.transaction.aggregate({
      where: {
        ...filter,
        OR: filter_or,
      },
      _sum: { amount: true },
    }))._sum.amount || 0;
  }

  async getPendingBudgetExpenses(id: string) {
    return (await this.databaseService.transaction.aggregate({
      where: {
        budget: {
          id,
        },
        status: "PENDING",
      },
      _sum: { amount: true },
    }))._sum.amount || 0;
  }

  async getBudgetTransactionCount(
    id: string,
    startDate?: Date,
    endDate?: Date,
    status?: Prisma.EnumTransactionStatusFilter,
  ) {
    const filter: any = {
      budget: {
        id,
      },
    };

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.gte = startDate;
      }
      if (endDate) {
        filter.createdAt.lte = endDate;
      }
    }

    if (status) {
      filter.status = status;
    }

    return this.databaseService.transaction.count({
      where: filter,
    });
  }
}
