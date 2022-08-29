import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Render,
  Res,
  UseFilters
} from '@nestjs/common';
import express, { Request, Response } from 'express';
import { AppService } from './app.service';
import { UploadService } from './upload/upload.service';
import { ParseShortidPipe } from './common/pipes/parse-shortid.pipe';
import { join } from 'path';
import shortid = require('shortid');

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly uploadService: UploadService
  ) {}

  @Get(':id')
  getImage(@Param('id') id: string, @Res() res: Response) {
    if(!shortid.isValid(id)){ //! If the id is not valid show 404 Page
      res.sendFile(join(__dirname, '..', 'public','404.html'));
      return;
    }
    res.render('imageViewer', {
      src: `${process.env.GATEWAY_URL}/api/upload/${id}`
    });
  }
}
