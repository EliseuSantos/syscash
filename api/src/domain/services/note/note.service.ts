import { Note } from '@domain/entities/note';
import { NoteRepository } from '@infrastructure/repositories/note';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class NoteService {
  constructor(private readonly noteRepository: NoteRepository) {}

  async getAllNotes(): Promise<Note[]> {
    return await this.noteRepository.getNotes();
  }

  async notesRules(value, notesWithdraw = {}) {
    try {
      const notes = await this.getAllNotes();
      const note = notes.find(
        (bankNote) => bankNote.value <= value && bankNote.items.length > 0,
      );

      if (!note || note.value > value) {
        throw new InternalServerErrorException('Notas Insuficientes');
      }

      this.noteRepository.removeItemOnNote(note);

      if (!notesWithdraw[note.value]) {
        notesWithdraw[note.value] = 0;
      }

      notesWithdraw[note.value]++;

      const valueLeft = value - note.value;

      if (valueLeft === 0) {
        return { withdraw: notesWithdraw, note };
      }

      return await this.notesRules(valueLeft, notesWithdraw);
    } catch (e) {
      throw new InternalServerErrorException(
        e.message || 'Falha na busca das notas',
      );
    }
  }
}
