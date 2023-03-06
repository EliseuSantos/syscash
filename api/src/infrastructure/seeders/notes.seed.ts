import { Note, NoteDocument } from '@domain/entities';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types, Model } from 'mongoose';
import { Seeder } from 'nestjs-seeder';

@Injectable()
export class NotesSeeder implements Seeder {
  constructor(
    @InjectModel('Note') private readonly note: Model<NoteDocument>,
  ) {}

  async seed(): Promise<any> {
    const notes = [
      {
        name: '10',
        value: 10,
        image: 'https://i.ibb.co/PWJbr6b/cedula10.png',
        symbol: 'R$',
      },
      {
        name: '20',
        value: 20,
        image: 'https://i.ibb.co/hZjYPtR/cedula20.png',
        symbol: 'R$',
      },
      {
        name: '50',
        value: 50,
        image: 'https://i.ibb.co/vPYb0HF/cedula50.png',
        symbol: 'R$',
      },
      {
        name: '100',
        value: 100,
        image: 'https://i.ibb.co/drTGyJQ/cedula100.jpg',
        symbol: 'R$',
      },
    ];

    notes.map((noteItem: Note) => {
      noteItem.items = Array.apply(null, { length: 50 }).map(
        Function.call,
        Types.ObjectId,
      );
      return noteItem;
    });

    return await this.note.insertMany(notes);
  }

  async drop(): Promise<any> {
    return this.note.deleteMany({});
  }
}
