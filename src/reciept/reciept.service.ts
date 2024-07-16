import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { FileService } from "src/file/file.service";

@Injectable()
export class RecieptService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly fileService: FileService,
  ) {}

  async create(transactionId: string, file: Express.Multer.File) {
    const fileData = await this.fileService.saveFile(file);
    return this.databaseService.reciept.create({
      data: {
        transaction: {
          connect: {
            id: transactionId,
          },
        },
        file: {
          connect: {
            id: fileData.id,
          },
        },
      },
    });
  }
}
