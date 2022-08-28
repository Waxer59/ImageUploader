import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import express, { Request, Response } from 'express';
import { join } from 'path';
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
    res.sendFile(join(__dirname, '..', 'public', 'imageViewer.html'));
  }
}
