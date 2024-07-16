import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [CloudinaryModule, DatabaseModule],
  providers: [FileService],
  exports: [FileService]
})
export class FileModule {}
