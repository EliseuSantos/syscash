import { CashOutDocument } from '@domain/entities';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CashOutRepository {
  constructor(
    @InjectModel('CashOut')
    private readonly cashOutModel: Model<CashOutDocument>,
  ) {}

  async getNotes(): Promise<CashOutDocument[]> {
    return this.cashOutModel.find({}).exec();
  }

  async createCashout(
    amount: number,
    user_id: string,
  ): Promise<CashOutDocument | any> {
    try {
      return this.cashOutModel.create({
        amount,
        user_id,
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
