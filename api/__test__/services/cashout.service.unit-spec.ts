import { fakeCashOut } from '__test__/factories/cashout.factory';
import { CashOutService, NoteService } from '@domain/services';
import { CashOutRepository } from '@infrastructure/repositories';
import { NoteRepository } from '@infrastructure/repositories/note';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';

let cashoutService: CashOutService;
let noteService: NoteService;
let cashoutRepository: CashOutRepository;

describe('Cashout service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    const modelFunctions = {
      requestCashOut: jest.fn(),
    };

    const mockCashOutRepository = {
      createCashout: jest.fn(),
    };
    const defaultRef = await Test.createTestingModule({
      providers: [
        CashOutService,
        NoteService,
        {
          provide: CashOutRepository,
          useValue: mockCashOutRepository,
        },
        {
          provide: NoteRepository,
          useValue: mockCashOutRepository,
        },
        {
          provide: getModelToken('CashOut'),
          useValue: modelFunctions,
        },
        {
          provide: getModelToken('Note'),
          useValue: modelFunctions,
        },
      ],
      imports: [],
      exports: [CashOutService, NoteService, CashOutRepository],
    }).compile();

    await defaultRef.createNestApplication().init();
    cashoutService = defaultRef.get<CashOutService>(CashOutService);
    noteService = defaultRef.get<NoteService>(NoteService);
    cashoutRepository = defaultRef.get<CashOutRepository>(CashOutRepository);
  });

  describe('create Cashout Scenarios', () => {
    it('Should request CashOut', async () => {
      const fakeData = fakeCashOut;

      jest.spyOn(noteService, 'notesRules').mockResolvedValue({
        notesWithdraw: {
          '10': 12,
        },
        note: {
          _id: '640481db3acb20efef559ec4',
          name: '10',
          value: 10,
          symbol: 'R$',
          image: 'http://',
          items: [],
        },
      });

      jest
        .spyOn(cashoutRepository, 'createCashout')
        .mockResolvedValue(fakeData);

      const result = await cashoutService.requestCashOut(
        { amount: 200 },
        { _id: 2 },
      );

      expect(result).toHaveProperty('notesWithdraw');
    });
  });
});
