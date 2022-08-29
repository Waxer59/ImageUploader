import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform, NotFoundException } from '@nestjs/common';
import shortid = require('shortid');

@Injectable()
export class ParseShortidPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if(!shortid.isValid(value)){
      throw new BadRequestException(`${value} is not a valid ID`)
    }
    return value;
  }
}
