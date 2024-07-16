import { Module } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TransactionService } from 'src/transaction/transaction.service';
import { CurrencyModule } from 'src/currency/currency.module';
import { TransactionModule } from 'src/transaction/transaction.module';
import { RecieptModule } from 'src/reciept/reciept.module';

@Module({
  imports: [DatabaseModule, CurrencyModule, TransactionModule, RecieptModule, CurrencyModule],
  controllers: [BudgetController],
  providers: [BudgetService, TransactionService],
  exports: [BudgetService],
})
export class BudgetModule {}
