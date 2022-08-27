import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Img extends Document {

  @Prop({
    unique: true,
    index: true,
  })
  code: string;

  @Prop({
    unique: true,
    index: true,
  })
  img: string;
}

export const ImageSchema = SchemaFactory.createForClass(Img);
