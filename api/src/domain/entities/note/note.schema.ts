import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export type NoteDocument = Note & Document;

@Schema()
export class Note {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true })
  symbol: string;

  @Prop({ required: true })
  image: string;

  @Prop()
  items: Types.ObjectId[];
}

export const NoteSchema = SchemaFactory.createForClass(Note);
