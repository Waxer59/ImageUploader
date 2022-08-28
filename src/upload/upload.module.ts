import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema, Img } from './entities/upload.entity';
import { ConfigModule } from '@nestjs/config';


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
    ConfigModule.forRoot(),
  ],
  exports: [MongooseModule, UploadService]
})
export class UploadModule {}
