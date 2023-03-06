import { NoteDocument } from '@domain/entities';
import Chance from 'chance';
import { Types } from 'mongoose';

const chance = new Chance();

export const fakeNote = {
  name: chance.string(),
  value: chance.integer(),
  symbol: chance.string(),
  image: chance.url(),
  items: [],
} as NoteDocument;

export const fakeNoteDefault = {
  _id: new Types.ObjectId(),
  name: '10',
  value: 10,
  symbol: 'R$',
  image: chance.url(),
  items: [
    {
      _id: new Types.ObjectId(),
    },
  ],
} as NoteDocument;
