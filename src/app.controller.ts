import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Render,
  Res
} from '@nestjs/common';
import express, { Request, Response } from 'express';
import { AppService } from './app.service';
import { UploadService } from './upload/upload.service';
import { ParseShortidPipe } from './common/pipes/parse-shortid.pipe';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly uploadService: UploadService
  ) {}

  @Get(':id')
  getImage(@Param('id', ParseShortidPipe) id: string, @Res() res: Response) {
    res.render('imageViewer', {
      src: `${process.env.GATEWAY_URL}/api/upload/${id}`
    });
  }
}
