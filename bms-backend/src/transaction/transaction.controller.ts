import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { Request } from "express";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("transaction")
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.transactionService.findOne(id);
  }

  @Post(":id/approve")
  approveTransaction(
    @Param("id", ParseUUIDPipe) id: string,
    @Req() req: Request,
  ) {
    const handlerId = req.user.id;
    // const isBudgetOwner = this.transactionService.isUserTransactionBudgetOwner(
    //   id,
    //   handlerId,
    // );
    // const isBudgetAdmin = this.transactionService.isUserTransactionBudgetAdmin(
    //   id,
    //   handlerId,
    // );
    // const isAuthorized = isBudgetAdmin || isBudgetOwner;
    return this.transactionService.approveTransaction(id, handlerId);
  }

  @Post(":id/reject")
  async rejectTransaction(
    @Param("id") id: string,
    @Req() req: Request,
  ) {
    const handlerId = req.user.id;
    // const isBudgetOwner = this.transactionService.isUserTransactionBudgetOwner(
    //   id,
    //   handlerId,
    // );
    // const isBudgetAdmin = this.transactionService.isUserTransactionBudgetAdmin(
    //   id,
    //   handlerId,
    // );
    // const isAuthorized = isBudgetAdmin || isBudgetOwner;
    return this.transactionService.rejectTransaction(id, handlerId);
  }

  @Post(":id/validate")
  @UseInterceptors(FileInterceptor("file"))
  async validateTransaction(
    @Param("id") id: string,
    @Req() req: Request,
    @UploadedFile(ParseFilePipe) file: Express.Multer.File,
  ) {
    const handlerId = req.user.id;
    // const isBudgetOwner = this.transactionService.isUserTransactionBudgetOwner(
    //   id,
    //   handlerId,
    // );
    // const isBudgetAdmin = this.transactionService.isUserTransactionBudgetAdmin(
    //   id,
    //   handlerId,
    // );
    // const isAuthorized = isBudgetAdmin || isBudgetOwner;
    return this.transactionService.validateTransaction(id, file, handlerId);
  }
}
