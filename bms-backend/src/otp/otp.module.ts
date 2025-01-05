import { Module } from "@nestjs/common";
import { OtpService } from "./otp.service";
import { MailerModule } from "src/mailer/mailer.module";
import { DatabaseModule } from "src/database/database.module";

@Module({
  imports: [DatabaseModule, MailerModule],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
