import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Img } from './entities/upload.entity';
import shortid = require('shortid');
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UploadService {
  constructor(
    @InjectModel(Img.name)
    private readonly imgModel: Model<Img>
  ) {}

  async createImage(imgName: string) {
    const code = shortid.generate();

    const image = await this.imgModel.create({img: imgName, code});
    
    return code;
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }
}
