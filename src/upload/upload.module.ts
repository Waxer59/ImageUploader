import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema, Img } from './entities/upload.entity';


@Module({
  controllers: [UploadController],
  providers: [UploadService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Img.name,
        schema: ImageSchema,
      },
    ]),
  ],
  exports: [MongooseModule]
})
export class UploadModule {}
