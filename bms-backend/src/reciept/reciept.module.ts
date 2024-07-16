import { Module } from "@nestjs/common";
import { RecieptService } from "./reciept.service";
import { DatabaseModule } from "src/database/database.module";
import { FileModule } from "src/file/file.module";

@Module({
  imports: [DatabaseModule, FileModule],
  providers: [RecieptService],
  exports: [RecieptService],
})
export class RecieptModule {}
