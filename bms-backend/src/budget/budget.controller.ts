import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { BudgetService } from "./budget.service";
import { CreateBudgetDto } from "./dto/create-budget.dto";
import { UpdateBudgetDto } from "./dto/update-budget.dto";
import { Request } from "express";
import { CreateTransactionDto } from "src/transaction/dto/create-transaction.dto";
import { TransactionService } from "src/transaction/transaction.service";
import { ParseDatePipe } from "src/utils/transformers/date.pipe";
import * as moment from "moment";
import { retrievePagination } from "src/utils/helpers";
import { Prisma } from "@prisma/client";
import { AddMemberOrAdminDto } from "./dto/add-member.dto";
import { ParseTransactionStatus } from "src/utils/transformers";
import { TRANSACTION_STATUSES } from "../constants";

@Controller("budget")
export class BudgetController {
  constructor(
    private readonly budgetService: BudgetService,
    private readonly transactionService: TransactionService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(
    @Body() createBudgetDto: CreateBudgetDto,
    @Req() req: Request,
  ) {
    const ownerId = req.user.id;
    try {
      return this.budgetService.create(createBudgetDto, ownerId);
    } catch (e) {
      throw e;
    }
  }

  @Get(":id")
  async findOne(
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    const budget = await this.budgetService.findOne(id);
    if (!budget) {
      throw new NotFoundException(`Budget not found`);
    }
    return budget;
  }

  @Patch(":id")
  @UsePipes(ValidationPipe)
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateBudgetDto: UpdateBudgetDto,
    @Req() req: Request,
  ) {
    try {
      return this.budgetService.update(id, updateBudgetDto, req.user.id);
    } catch (e) {
      throw e;
    }
  }

  @Get(":id/summary")
  async getSummary(
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    const budget = await this.budgetService.findOne(id);
    if (!budget) {
      throw new NotFoundException(`Budget not found`);
    }

    // Fetch total expenses for the budget
    const totalExpenses = await this.transactionService.getTotalBudgetExpenses(
      id,
    );
    const pendingExpenses = await this.transactionService
      .getPendingBudgetExpenses(
        id,
      );

    // Calculate the date ranges for current and previous week
    const now = new Date();
    const oneWeekAgo = moment(now).subtract(1, "week").toDate();
    const twoWeeksAgo = moment(now).subtract(2, "week").toDate();

    // Fetch average expenses for the current week and the previous week
    const weeklyAvgExpense = await this.budgetService.getAvgExpense(
      id,
      oneWeekAgo,
      now,
    );
    const prevWeeklyAvgExpense = await this.budgetService.getAvgExpense(
      id,
      twoWeeksAgo,
      oneWeekAgo,
    );

    return {
      aggregates: {
        totalExpenses,
        pendingExpenses,
        weeklyAvgExpense,
        prevWeeklyAvgExpense,
        balance: budget.amount - totalExpenses,
      },
      budget,
    };
  }

  @Post(":id/freeze-budget")
  freezeBudget(
    @Param("id", ParseUUIDPipe) id: string,
    @Req() req: Request,
  ) {
    try {
      return this.budgetService.freezeBudget(id, req.user.id);
    } catch (e) {
      throw e;
    }
  }

  @Post(":id/unfreeze-budget")
  unfreezeBudget(
    @Param("id", ParseUUIDPipe) id: string,
    @Req() req: Request,
  ) {
    try {
      return this.budgetService.unfreezeBudget(id, req.user.id);
    } catch (e) {
      throw e;
    }
  }

  @Post(":id/member")
  @UsePipes(ValidationPipe)
  addMember(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() addMemberDto: AddMemberOrAdminDto,
    @Req() req: Request,
  ) {
    try {
      return this.budgetService.addMember(id, addMemberDto.email, req.user.id);
    } catch (e) {
      throw e;
    }
  }

  @Post(":id/admin")
  @UsePipes(ValidationPipe)
  addAdmin(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() adminData: AddMemberOrAdminDto,
    @Req() req: Request,
  ) {
    return this.budgetService.addAdmin(id, adminData.email, req.user.id);
  }

  @Delete(":id/member")
  @UsePipes(ValidationPipe)
  removeMember(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() removeMemberDto: AddMemberOrAdminDto,
    @Req() req: Request,
  ) {
    try {
      return this.budgetService.removeMember(
        id,
        removeMemberDto.email,
        req.user.id,
      );
    } catch (e) {
      throw e;
    }
  }

  @Delete(":id/admin")
  @UsePipes(ValidationPipe)
  removeAdmin(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() removeAdminDto: AddMemberOrAdminDto,
    @Req() req: Request,
  ) {
    try {
      return this.budgetService.removeAdmin(
        id,
        removeAdminDto.email,
        req.user.id,
      );
    } catch (e) {
      throw e;
    }
  }

  @Post(":id/transaction")
  @UsePipes(ValidationPipe)
  addTransaction(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() createTransactionDto: CreateTransactionDto,
    @Req() req: Request,
  ) {
    const creatorId = req.user.id;
    try {
      return this.transactionService.create(
        createTransactionDto,
        creatorId,
        id,
      );
    } catch (e) {
      throw e;
    }
  }

  @Get(":id/transaction")
  async getTransactions(
    @Param("id", ParseUUIDPipe) id: string,
    @Query("startDate", ParseDatePipe) startDate: Date,
    @Query("endDate", ParseDatePipe) endDate: Date,
    @Query("status", ParseTransactionStatus) status:
      Prisma.EnumTransactionStatusFilter,
    @Req() req: Request,
  ) {
    const budget = await this.budgetService.findOne(id);

    if (!budget) throw new NotFoundException("Budget does not exist");

    const pagination = retrievePagination(req);
    const transactions = await this.transactionService.findBudgetTransactions(
      id,
      pagination,
      startDate,
      endDate,
      status,
    );
    const transactionCount = await this.transactionService
      .getBudgetTransactionCount(id, startDate, endDate, status);
    const totalExpenses = await this.transactionService
      .getTotalBudgetExpenses(
        id,
        startDate,
        endDate,
        status
          ? [status]
          : TRANSACTION_STATUSES as Prisma.EnumTransactionStatusFilter[],
      );
    return {
      aggregates: {
        count: transactionCount,
        total: {
          currency: budget.currency,
          amount: totalExpenses,
        },
      },
      transactions,
    };
  }

  @Get(":id/members")
  getMembers(
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.budgetService.getBudgetMembers(id);
  }

  @Get(":id/admins")
  getAdmins(
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.budgetService.getBudgetAdmins(id);
  }

  @Get(":id/user-expenditure")
  getUserExpenditure(
    @Param("id", ParseUUIDPipe) id: string,
    @Req() req: Request,
  ) {
    const pagination = retrievePagination(req);
    return this.budgetService.getExpenditureByUser(id, pagination);
  }

  @Delete(":id")
  remove(
    @Param("id", ParseUUIDPipe) id: string,
    @Req() req: Request,
  ) {
    const userId = req.user.id;
    return this.budgetService.remove(id, userId);
  }
}
