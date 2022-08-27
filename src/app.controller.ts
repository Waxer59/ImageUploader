import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import express, { Request, Response } from 'express';
import { join } from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  getImage(@Param('id') id: string, @Res() res: Response) {
    res.sendFile(join(__dirname, '..', 'public', 'imageViewer.html'));
  }
}
