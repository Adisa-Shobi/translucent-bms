import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { DatabaseModule } from "src/database/database.module";
import { TransactionModule } from "src/transaction/transaction.module";
import { BudgetModule } from "src/budget/budget.module";

@Module({
  imports: [DatabaseModule, TransactionModule, BudgetModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
