import { fakeNote, fakeNoteDefault } from '__test__/factories/note.factory';
import { NoteService } from '@domain/services';
import { NoteRepository } from '@infrastructure/repositories/note';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';

let noteService: NoteService;
let noteRepository: NoteRepository;

describe('Note service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    const modelFunctions = {
      notesRules: jest.fn(),
      getAllNotes: jest.fn(),
    };

    const mockNoteRepository = {
      getNotes: jest.fn(),
      removeItemOnNote: jest.fn(),
    };
    const defaultRef = await Test.createTestingModule({
      providers: [
        NoteService,
        {
          provide: NoteRepository,
          useValue: mockNoteRepository,
        },
        {
          provide: getModelToken('Note'),
          useValue: modelFunctions,
        },
      ],
      imports: [],
      exports: [NoteService],
    }).compile();

    await defaultRef.createNestApplication().init();
    noteService = defaultRef.get<NoteService>(NoteService);
    noteRepository = defaultRef.get<NoteRepository>(NoteRepository);
  });

  describe('create Cashout Scenarios', () => {
    it('Should return success on getAllNotes', async () => {
      const fakeData = fakeNote;

      jest.spyOn(noteRepository, 'getNotes').mockResolvedValue([fakeData]);

      const result = await noteService.getAllNotes();

      expect(result).toHaveLength(1);
    });

    it('Should return success on notesRules', async () => {
      const fakeData = fakeNoteDefault;

      jest.spyOn(noteRepository, 'getNotes').mockResolvedValue([fakeData]);

      const result = await noteService.notesRules(10);

      expect(result).toHaveProperty('note');
    });
  });
});
