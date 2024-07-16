import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CurrencyService],
  controllers: [CurrencyController],
  exports: [CurrencyService]
})
export class CurrencyModule {}
