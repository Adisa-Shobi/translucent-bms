import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateBudgetDto } from "./dto/create-budget.dto";
import { UpdateBudgetDto } from "./dto/update-budget.dto";
import { DatabaseService } from "src/database/database.service";
import { Pagination } from "src/global-validators";
import moment from "moment";
import { TransactionService } from "src/transaction/transaction.service";
import { CurrencyService } from "src/currency/currency.service";
import { emit } from "process";
import { convertBigIntToString } from "src/utils/helpers";

@Injectable()
export class BudgetService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly transactionService: TransactionService,
    private readonly currencyService: CurrencyService,
  ) {}

  async create(createBudgetDto: CreateBudgetDto, ownerId: string) {
    const { currencyId, ...data } = {
      ...createBudgetDto,
      title: createBudgetDto.title.trim(),
    };

    // Check if currency exists
    const currency = await this.currencyService.getCurrencyById(currencyId);
    if (!currency) {
      throw new BadRequestException("Currency not found");
    }

    // Check if budget with the same title exists
    const budget = await this.databaseService.budget.findFirst({
      where: {
        title: data.title,
        ownerId,
      },
    });
    if (budget) {
      throw new BadRequestException("Budget with this title already exists");
    }

    return this.databaseService.budget.create({
      data: {
        ...data,
        currency: {
          connect: {
            id: currencyId,
          },
        },
        owner: {
          connect: {
            id: ownerId,
          },
        },
      },
    });
  }

  findUserBudgets(userId: string) {
    return this.databaseService.budget.findMany({
      where: {
        owner: {
          id: userId,
        },
      },
    });
  }

  findOne(id: string) {
    return this.databaseService.budget.findUnique({ where: { id } });
  }

  async update(id: string, updateBudgetDto: UpdateBudgetDto, userId: string) {
    const budget = this.databaseService.budget.findUnique({
      where: { id, ownerId: userId },
    });

    if (!budget) {
      throw new BadRequestException(
        "Budget not found. Make sure you own this budget",
      );
    }

    if (updateBudgetDto.title) {
      updateBudgetDto.title = updateBudgetDto.title.trim();

      const similarBudget = await this.databaseService.budget.findFirst({
        where: {
          title: updateBudgetDto.title,
          ownerId: userId,
        },
      });

      if (similarBudget) {
        throw new BadRequestException(
          "Budget with this title already exists",
        );
      }
    }

    return this.databaseService.budget.update({
      where: { id },
      data: updateBudgetDto,
    });
  }

  async remove(id: string, operatorId: string) {
    const budget = await this.databaseService.budget.findUnique({
      where: { id },
    });

    if (!budget) {
      throw new BadRequestException("Budget not found");
    }

    if (budget.ownerId !== operatorId) {
      throw new UnauthorizedException("Only budget owner can delete budget");
    }

    return this.databaseService.budget.delete({ where: { id } });
  }

  async freezeBudget(id: string, userId: string) {
    const budget = await this.databaseService.budget.findUnique({
      where: { id },
    });
    if (!budget) {
      throw new BadRequestException("Budget not found");
    }
    if (!await this.isBudgetOwner(id, userId)) {
      throw new UnauthorizedException("Only budget owner can freeze budget");
    }
    if (budget.isFrozen) {
      throw new BadRequestException("Budget is already frozen");
    }
    return this.databaseService.budget.update({
      where: { id },
      data: { isFrozen: true },
    });
  }

  async unfreezeBudget(id: string, userId: string) {
    const budget = await this.databaseService.budget.findUnique({
      where: { id },
    });
    if (!budget) {
      throw new BadRequestException("Budget not found");
    }
    if (!await this.isBudgetOwner(id, userId)) {
      throw new UnauthorizedException("Only budget owner can unfreeze budget");
    }
    if (!budget.isFrozen) {
      throw new BadRequestException("Budget is not frozen");
    }
    return this.databaseService.budget.update({
      where: { id },
      data: { isFrozen: false },
    });
  }

  addTransaction(id: string, transactionId: string) {
    return this.databaseService.budget.update({
      where: { id },
      data: { transactions: { connect: { id: transactionId } } },
    });
  }

  async getBudgetBalance(id: string) {
    const expenses = await this.transactionService.getTotalBudgetExpenses(id);
    return (await this.databaseService.budget.findUnique({ where: { id } }))
      .amount - expenses;
  }

  async getAvgExpense(id: string, createdAt?: Date, updatedAt?: Date) {
    return (await this.databaseService.transaction.aggregate({
      where: {
        budgetId: id,
        createdAt: {
          gte: createdAt,
          lte: updatedAt,
        },
        OR: [
          {
            status: "APPROVED",
          },
          {
            status: "VALIDATED",
          },
        ],
      },
      _avg: {
        amount: true,
      },
    }))._avg.amount || 0;
  }

  async addMember(id: string, memberEmail: string, operatorId: string) {
    const budget = await this.databaseService.budget.findUnique({
      where: {
        id,
        OR: [
          {
            ownerId: operatorId,
          },
          {
            admins: {
              some: {
                userId: operatorId,
              },
            },
          },
        ],
      },
    });

    if (!budget) {
      throw new BadRequestException(
        "Budget not found! Make sure you have admin access to this budget.",
      );
    }

    const user = await this.databaseService.user.findFirst({
      where: { email: memberEmail },
    });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    return this.databaseService.budget.update({
      where: { id },
      data: {
        members: {
          create: [
            {
              user: {
                connect: {
                  email: memberEmail,
                },
              },
            },
          ],
        },
      },
    });
  }

  async addAdmin(id: string, adminEmail: string, operatorId: string) {
    const user = await this.databaseService.user.findFirst({
      where: { email: adminEmail },
    });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    const budget = await this.databaseService.budget.findUnique({
      where: {
        id,
        ownerId: operatorId,
      },
      include: {
        members: {
          where: {
            user: {
              email: adminEmail,
            },
          },
        },
      },
    });

    if (!budget) {
      throw new BadRequestException(
        "Budget not found! Make sure you own this budget.",
      );
    }

    if (budget.members.length === 0) {
      throw new BadRequestException(
        "User must be a member of the budget before being added as an admin",
      );
    }

    return this.databaseService.budget.update({
      where: { id },
      data: {
        admins: {
          create: [
            {
              user: {
                connect: {
                  email: adminEmail,
                },
              },
            },
          ],
        },
      },
    });
  }

  async removeMember(id: string, memberEmail: string, operatorId: string) {
    const budget = await this.databaseService.budget.findFirst({
      where: {
        id,
        ownerId: operatorId,
      },
      include: {
        members: {
          where: {
            user: {
              email: memberEmail,
            },
          },
        },
      },
    });

    if (!budget) {
      throw new BadRequestException(
        "Budget not found! Make sure you own this budget.",
      );
    }

    if (budget.members.length === 0) {
      throw new BadRequestException("User is not a member of the budget");
    }

    return this.databaseService.budgetMember.deleteMany({
      where: {
        budgetId: id,
        user: {
          email: memberEmail,
        },
      },
    });
  }

  async removeAdmin(id: string, adminEmail: string, operatorId: string) {
    // if (operatorId === adminId) {
    //   throw new BadRequestException(
    //     "You can't remove yourself from the admin list",
    //   );
    // }

    const budget = await this.databaseService.budget.findFirst({
      where: {
        id,
        ownerId: operatorId,
      },
      include: {
        admins: {
          where: {
            user: {
              email: adminEmail,
            },
          },
        },
        members: {
          where: {
            user: {
              email: adminEmail,
            },
          },
        },
      },
    });

    if (!budget) {
      throw new BadRequestException(
        "Budget not found! Make sure you own this budget.",
      );
    }

    if (budget.admins.length === 0) {
      throw new BadRequestException("User is not an admin of the budget");
    }

    if (budget.members.length !== 0) {
      await this.databaseService.budgetMember.deleteMany({
        where: {
          budgetId: id,
          user: {
            email: adminEmail,
          },
        },
      });
    }

    return this.databaseService.budgetAdmin.deleteMany({
      where: {
        budgetId: id,
        user: {
          email: adminEmail,
        },
      },
    });
  }

  async isBudgetOwner(budgetId: string, userId: string) {
    const budget = await this.databaseService.budget.findUnique({
      where: { id: budgetId },
    });
    return budget.ownerId === userId;
  }

  async getExpenditureByUser(id: string, pagination: Pagination) {
    const budget = await this.databaseService.budget.findUnique({
      where: { id },
    });

    if (!budget) {
      throw new BadRequestException("Budget not found");
    }

    const expenditures = await this.databaseService.user.findMany({
      where: {
        OR: [
          { memberBudgets: { some: { budgetId: id } } },
          { budgets: { some: { id } } },
        ],
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        profilePhoto: true,
        transactions: {
          where: {
            budgetId: id,
            status: { in: ["APPROVED", "VALIDATED"] },
          },
          select: {
            amount: true,
          },
        },
      },
      skip: pagination.skip,
      take: pagination.limit,
    });

    const processedExpenditures = expenditures.map((user) => ({
      ...user,
      totalTransactions: user.transactions.reduce(
        (sum, t) => sum + t.amount,
        0,
      ),
    }));

    const totalCount = await this.databaseService.user.count({
      where: {
        OR: [
          { memberBudgets: { some: { budgetId: id } } },
          { budgets: { some: { id } } },
        ],
      },
    });

    const allTransactions = await this.databaseService.transaction.findMany({
      where: {
        status: { in: ["APPROVED", "VALIDATED"] },
        budgetId: id,
      },
      select: {
        amount: true,
      },
    });

    const totalAmount = allTransactions.reduce((sum, t) => sum + t.amount, 0);
    const avgUserExpenditure = totalCount > 0 ? totalAmount / totalCount : 0;

    return {
      aggregates: {
        avgUserExpenditure,
        totalCount,
      },
      expenditures: processedExpenditures,
    };
  }

  async getBudgetsByUser(
    userId: string,
    startDate?: Date,
    endDate?: Date,
    isFrozen?: boolean,
    isClosed?: boolean,
    ownerBudgets?: boolean,
    memberBudgets?: boolean,
    adminBudgets?: boolean,
    pagination?: Pagination,
  ) {
    const filters_or: any = [];
    const filters_and: any = {};

    if (ownerBudgets !== false) {
      filters_or.push({
        owner: {
          id: userId,
        },
      });
    }

    if (startDate || endDate) {
      filters_and.createdAt = {};
      if (startDate) {
        filters_and.createdAt.gte = startDate;
      }
      if (endDate) {
        filters_and.createdAt.lte = endDate;
      }
    }

    if (typeof isFrozen === "boolean") {
      filters_and.isFrozen = isFrozen;
    }

    if (typeof isClosed === "boolean") {
      filters_and.endAt = {};
      if (isClosed === true) {
        filters_and.endAt.lte = new Date();
      } else {
        filters_and.endAt.gt = new Date();
      }
    }

    if (memberBudgets) {
      filters_or.push({
        members: {
          some: {
            user: {
              id: userId,
            },
          },
        },
      });
    }

    if (adminBudgets) {
      filters_or.push({
        admins: {
          some: {
            user: {
              id: userId,
            },
          },
        },
      });
    }

    if (filters_or.length === 0 && filters_and.length === 0) return [];

    const budgets = await this.databaseService.budget.findMany({
      where: {
        OR: filters_or,
        ...filters_and,
      },
      include: {
        admins: true,
        members: true,
        transactions: {
          where: {
            OR: [
              {
                status: "APPROVED",
              },
              {
                status: "VALIDATED",
              },
            ],
          },
          select: {
            amount: true,
          },
        },
      },
      skip: pagination?.skip,
      take: pagination?.limit,
    });

    return budgets.map((budget) => {
      const expenses = budget.transactions.reduce(
        (acc, transaction) => acc + transaction.amount,
        0,
      );
      const { transactions, ...budgetData } = budget;
      return {
        ...budgetData,
        expenses,
      };
    });
  }

  async getBudgetMembers(id: string) {
    const budget = await this.databaseService.budget.findUnique({
      where: {
        id,
      },
    });

    if (!budget) {
      throw new BadRequestException("Budget not found");
    }

    return this.databaseService.budget.findUnique({
      where: {
        id,
      },
      select: {
        members: {
          select: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                profilePhoto: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        },
      },
    });
  }

  async getBudgetAdmins(id: string) {
    const budget = await this.databaseService.budget.findUnique({
      where: {
        id,
      },
    });

    if (!budget) {
      throw new BadRequestException("Budget not found");
    }

    return this.databaseService.budget.findUnique({
      where: {
        id,
      },
      select: {
        admins: {
          select: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                profilePhoto: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        },
      },
    });
  }
}
