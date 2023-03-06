import { CashOutController } from '@application/controllers/cashout.controller';
import { CashOutService } from '@domain/services';
import { CashOutRepository } from '@infrastructure/repositories';
import { Test } from '@nestjs/testing';

describe('CashOutController', () => {
  const response = {
    send: (body?): any => body,
    status: () => response,
  };
  let cashoutController: CashOutController;
  let cashoutService: CashOutService;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    const modelFunctions = {
      requestCashOut: jest.fn(),
      createCashout: jest.fn(),
    };
    const defaultRef = await Test.createTestingModule({
      controllers: [CashOutController],
      providers: [
        {
          provide: CashOutService,
          useValue: modelFunctions,
        },
        {
          provide: CashOutRepository,
          useValue: modelFunctions,
        },
      ],
      exports: [CashOutService],
    }).compile();

    cashoutService = defaultRef.get<CashOutService>(CashOutService);
    cashoutController = defaultRef.get<CashOutController>(CashOutController);
  });

  describe('requestCashOut', () => {
    it('should return a success', async () => {
      jest.spyOn(cashoutService, 'requestCashOut');
      const req = {
        user: {
          _id: '2',
        },
      };
      await cashoutController.requestCashOut(req, { amount: 200 });

      expect(cashoutService.requestCashOut).toBeCalled();
    });
  });
});
