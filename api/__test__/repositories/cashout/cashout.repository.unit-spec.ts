import { fakeCashOut } from '__test__/factories/cashout.factory';
import { CashOut } from '@domain/entities';
import { CashOutService, NoteService } from '@domain/services';
import { CashOutRepository } from '@infrastructure/repositories';
import { NoteRepository } from '@infrastructure/repositories/note';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';

let cashoutRepository: CashOutRepository;
let cashoutModel: Model<CashOut>;

describe('CashOut repository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    const modelFunctions = {
      exec: jest.fn(),
      find: jest.fn(),
      create: jest.fn(),
    };
    const defaultRef: TestingModule = await Test.createTestingModule({
      providers: [
        CashOutService,
        NoteService,
        NoteRepository,
        CashOutRepository,
        {
          provide: getModelToken('CashOut'),
          useValue: modelFunctions,
        },
        {
          provide: getModelToken('Note'),
          useValue: modelFunctions,
        },
      ],
      exports: [CashOutService],
    }).compile();

    cashoutRepository = defaultRef.get<CashOutRepository>(CashOutRepository);
    cashoutModel = defaultRef.get<Model<CashOut>>(getModelToken('CashOut'));
  });

  describe('create CashOut Scenarios', () => {
    it('Should create a cashout', async () => {
      const createCashOutPayload = fakeCashOut;
      const expectedResult = {
        ...createCashOutPayload,
      };

      jest
        .spyOn(cashoutModel, 'create')
        .mockImplementationOnce(() => expectedResult as any);

      const result = await cashoutRepository.createCashout(
        createCashOutPayload.amount,
        '_2',
      );
      expect(result).toEqual(expectedResult);
    });
  });
});
