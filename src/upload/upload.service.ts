import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Img } from './entities/upload.entity';
import shortid = require('shortid');
import { InjectModel } from '@nestjs/mongoose';
import { join } from 'path';
import { existsSync } from 'fs';

@Injectable()
export class UploadService {
  constructor(
    @InjectModel(Img.name)
    private readonly imgModel: Model<Img>
  ) {}

  async createImage(imgName: string) {
    const code = shortid.generate();

    const image = await this.imgModel.create({ img: imgName, code });

    return code;
  }

  async getImage(code: string) {
    try {
      const { img } = await this.imgModel.findOne({ code });
  
      const path = join(__dirname, '..', '..', 'data', img);
  
      if(!existsSync(path)){
        throw new BadRequestException(`No image found with code ${code}`);
      }
  
      return path;
    } catch (error) {
      throw new NotFoundException('The image you were looking for does not exist')
    }
  }
}
