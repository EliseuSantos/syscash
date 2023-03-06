import { CashOutController } from '@application/controllers/cashout.controller';
import { CashOutSchema } from '@domain/entities/cashout';
import { NoteSchema } from '@domain/entities/note';
import { NoteService } from '@domain/services';
import { CashOutService } from '@domain/services/cashout';
import { OrmModule } from '@infrastructure/database/orm';
import { CashOutRepository } from '@infrastructure/repositories';
import { NoteRepository } from '@infrastructure/repositories/note';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    OrmModule.forFeature([
      { name: 'Note', schema: NoteSchema },
      { name: 'CashOut', schema: CashOutSchema },
    ]),
  ],
  controllers: [CashOutController],
  providers: [CashOutService, NoteService, NoteRepository, CashOutRepository],
  exports: [CashOutService, NoteService, NoteRepository, CashOutRepository],
})
export class CashOutModule {}
