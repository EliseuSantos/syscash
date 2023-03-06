import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CashOutDocument = CashOut & Document;

@Schema()
export class CashOut {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  amount: number;
}

export const CashOutSchema = SchemaFactory.createForClass(CashOut);
