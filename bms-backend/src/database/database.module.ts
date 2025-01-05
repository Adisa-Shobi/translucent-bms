import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { MailerModule } from 'src/mailer/mailer.module';
import { OtpModule } from 'src/otp/otp.module';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class DatabaseModule {}
