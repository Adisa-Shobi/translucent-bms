import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { DatabaseModule } from "src/database/database.module";
import { TransactionModule } from "src/transaction/transaction.module";
import { BudgetModule } from "src/budget/budget.module";
import { MailerModule } from "src/mailer/mailer.module";
import { OtpModule } from "src/otp/otp.module";

@Module({
  imports: [DatabaseModule, TransactionModule, BudgetModule, MailerModule, OtpModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
