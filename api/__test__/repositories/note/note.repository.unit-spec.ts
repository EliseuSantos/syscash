import { fakeNote, fakeNoteDefault } from '__test__/factories/note.factory';
import { Note } from '@domain/entities';
import { NoteService } from '@domain/services';
import { NoteRepository } from '@infrastructure/repositories/note';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';

let noteRepository: NoteRepository;
let noteModel: Model<Note>;

describe('Note repository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    const modelFunctions = {
      exec: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      sort: jest.fn(),
      create: jest.fn(),
    };
    const defaultRef: TestingModule = await Test.createTestingModule({
      providers: [
        NoteService,
        NoteRepository,
        NoteRepository,
        {
          provide: getModelToken('Note'),
          useValue: modelFunctions,
        },
      ],
      exports: [NoteService],
    }).compile();

    noteRepository = defaultRef.get<NoteRepository>(NoteRepository);
    noteModel = defaultRef.get<Model<Note>>(getModelToken('Note'));
  });

  describe('Note Scenarios', () => {
    it('Should return success on getNotes', async () => {
      const noteData = fakeNote;

      jest
        .spyOn(noteModel, 'find')
        .mockImplementationOnce(
          () => ({ sort: () => ({ exec: () => [noteData] }) } as any),
        );

      const result = await noteRepository.getNotes();
      expect(result).toEqual([fakeNote]);
    });

    it('Should return success on removeItemOnNote', async () => {
      const noteData = fakeNoteDefault;
      noteData.update = jest.fn();

      jest
        .spyOn(noteModel, 'findOne')
        .mockImplementationOnce(() => ({ exec: () => noteData } as any));

      const result = await noteRepository.removeItemOnNote(fakeNoteDefault);
      expect(result.items).toHaveLength(0);
    });
  });
});
