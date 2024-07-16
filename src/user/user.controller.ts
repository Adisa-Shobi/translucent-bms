import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseBoolPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Request } from "express";
import { retrievePagination } from "src/utils/helpers";
import { TransactionService } from "src/transaction/transaction.service";
import { ParseDatePipe, ParseOptBoolPipe, ParseTransactionStatus } from "src/utils/transformers";
import { Prisma } from "@prisma/client";
import { BudgetService } from "src/budget/budget.service";
import { Public } from "src/utils/decorators/public.decorator";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly transactionService: TransactionService,
    private readonly budgetService: BudgetService,
  ) {}

  @Public()
  @Post("register")
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.create(createUserDto);

    if (!newUser) {
      throw new BadRequestException("User already exists.");
    }
  }

  @Get()
  findAll(@Req() req: Request) {
    const pagination = retrievePagination(req);
    return this.userService.findAll(pagination);
  }

  @Get(":id")
  async findOne(@Param("id", ParseUUIDPipe) id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException("User not found.");
    }
    return user;
  }

  @Patch(":id")
  @UsePipes(ValidationPipe)
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ) {

    // If the authenticated user is not the same as the user being updated, throw an unauthorized exception
    if (req.user.id !== id) {
      throw new UnauthorizedException("Cannot update other users.");
    }

    // If the update data is empty, throw a bad request exception
    if (Object.keys(updateUserDto).length === 0) {
      throw new BadRequestException("Update data is empty.");
    }

    return this.userService.update(id, updateUserDto).catch((error) => {
      // If user not found (most likely marked as deleted), throw a bad request exception
      if (error.code === "P2025") {
        throw new NotFoundException("User not found.");
      }
    });
  }

  @Delete(":id")
  @HttpCode(204)
  async remove(
    @Param("id", ParseUUIDPipe) id: string,
    @Req() req: Request,
  ) {
    // If the authenticated user is not the same as the user being deleted, throw an unauthorized exception
    if (req.user.id !== id) {
      throw new UnauthorizedException("Cannot update other users.");
    }
    const user = await this.userService.remove(id);

    // If user not found (most likely marked as deleted), throw a bad request exception
    if (!user) {
      throw new NotFoundException("User not found.");
    }
    return;
  }

  @Get(":id/transaction")
  findUserTransactions(
    @Param("id", ParseUUIDPipe) id: string,
    @Req() req: Request,
    @Query("startDate", ParseDatePipe) startDate: Date,
    @Query("endDate", ParseDatePipe) endDate: Date,
    @Query("status", ParseTransactionStatus) status: Prisma.EnumTransactionStatusFilter,
  ) {
    const pagination = retrievePagination(req);
    return this.transactionService.findUserTransactions(
      id,
      pagination,
      startDate,
      endDate,
      status,
    );
  }

  @Get(":id/handled-transactions")
  findUserHandledTransactions(
    @Param("id", ParseUUIDPipe) id: string,
    @Req() req: Request,
    @Query("startDate", ParseDatePipe) startDate: Date,
    @Query("endDate", ParseDatePipe) endDate: Date,
    @Query("status", ParseTransactionStatus) status: Prisma.EnumTransactionStatusFilter,
  ) {
    const pagination = retrievePagination(req);
    return this.transactionService.findUserHandledTransactions(
      id,
      pagination,
      startDate,
      endDate,
      status,
    );
  }

  @Get(":id/budgets")
  findUserBudgets(
    @Param("id") id: string,
    @Req() req: Request,
    @Query("ownerBudgets", ParseOptBoolPipe) ownerBudgets: boolean,
    @Query("memberBudgets", ParseOptBoolPipe) memberBudgets: boolean,
    @Query("adminBudgets", ParseOptBoolPipe) adminBudgets: boolean,
    @Query("startDate", ParseDatePipe) startDate: Date,
    @Query("endDate", ParseDatePipe) endDate: Date,
    @Query("isFrozen", ParseOptBoolPipe) isFrozen: boolean,
    @Query("isClosed", ParseOptBoolPipe) isClosed: boolean,
  ) {
    const pagination = retrievePagination(req);
    return this.budgetService.getBudgetsByUser(
      id,
      startDate,
      endDate,
      isFrozen,
      isClosed,
      ownerBudgets,
      memberBudgets,
      adminBudgets,
      pagination,
    );
  }
}
