import { CashOutRepository } from '@infrastructure/repositories/cashout';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { NoteService } from '../note';

@Injectable()
export class CashOutService {
  constructor(
    private readonly cashoutRepository: CashOutRepository,
    private readonly noteService: NoteService,
  ) {}

  async requestCashOut({ amount }, user) {
    try {
      const notesCashout = await this.noteService.notesRules(amount);
      await this.cashoutRepository.createCashout(amount, user._id);

      return notesCashout;
    } catch (e) {
      throw new InternalServerErrorException('Falha na operação');
    }
  }
}
