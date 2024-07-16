import { Module } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { TransactionController } from "./transaction.controller";
import { DatabaseModule } from "src/database/database.module";
import { RecieptModule } from "src/reciept/reciept.module";
import { BudgetModule } from "src/budget/budget.module";

@Module({
  imports: [RecieptModule, DatabaseModule],
  controllers: [TransactionController],
  providers: [
    TransactionService
  ],
  exports: [TransactionService],
})
export class TransactionModule {}
