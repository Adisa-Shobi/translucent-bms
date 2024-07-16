import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule],
    providers: [CloudinaryService],
    exports: [CloudinaryService]
})
export class CloudinaryModule {}
