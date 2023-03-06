import { RequestCashOutDto } from '@application/dtos';
import Chance from 'chance';

const chance = new Chance();

export const fakeCashOut: RequestCashOutDto = {
  amount: chance.integer(),
};
