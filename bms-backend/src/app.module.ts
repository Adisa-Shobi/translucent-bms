import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { DatabaseModule } from "./database/database.module";
import { BudgetModule } from './budget/budget.module';
import { TransactionModule } from './transaction/transaction.module';
import { RecieptService } from './reciept/reciept.service';
import { RecieptModule } from './reciept/reciept.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { FileModule } from './file/file.module';
import { CurrencyModule } from './currency/currency.module';
import { MailerService } from './mailer/mailer.service';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    DatabaseModule,
    BudgetModule,
    TransactionModule,
    RecieptModule,
    CloudinaryModule,
    FileModule,
    CurrencyModule,
    MailerModule,
  ],
  providers: [RecieptService, CloudinaryService, MailerService],
})
export class AppModule {}
