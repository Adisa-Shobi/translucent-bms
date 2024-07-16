import { Injectable } from "@nestjs/common";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { Prisma } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class FileService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly databaseService: DatabaseService,
  ) {}

  async saveFile(file: Express.Multer.File): Promise<Prisma.FileCreateInput> {
    const result = await this.cloudinaryService.uploadFile(file);
    if (result instanceof Error) {
      throw result;
    }
    return this.databaseService.file.create(
      {
        data: {
          name: result.original_filename,
          url: result.url,
        },
      },
    );
  }
}
