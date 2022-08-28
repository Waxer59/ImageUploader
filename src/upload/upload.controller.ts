import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
  Res
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter } from './helpers/fileFilter.helper';
import { UploadService } from './upload.service';
import express, { Request, Response } from 'express';
import { fileNamer } from './helpers/fileNamer.helper';
import { ParseShortidPipe } from '../common/pipes/parse-shortid.pipe';

@Controller('api/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './data',
        filename: fileNamer
      })
    })
  )
  async create(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Make sure that the file is an image');
    }

    const imageCode = await this.uploadService.createImage(file.filename);

    return { code: imageCode };
  }

  @Get(':code')
  async findOne(
    @Param('code', ParseShortidPipe) code: string,
    @Res() res: Response
  ) {
    const path = await this.uploadService.getImage(code);

    res.sendFile(path);
  }
}
