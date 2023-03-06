import { AuthController } from '@application/controllers/auth.controller';
import { FingerCheckDto } from '@application/dtos/auth';
import { AuthDto } from '@application/dtos/auth/authDto';
import { AuthService } from '@domain/services/auth';
import { CashOutRepository } from '@infrastructure/repositories';
import { Test } from '@nestjs/testing';

describe('AuthController', () => {
  const response = {
    send: (body?): any => body,
    status: () => response,
  };
  let authController: AuthController;
  let authService: AuthService;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    const modelFunctions = {
      validateFinger: jest.fn(),
      login: jest.fn(),
    };
    const defaultRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: modelFunctions,
        },
        {
          provide: CashOutRepository,
          useValue: modelFunctions,
        },
      ],
      exports: [AuthService],
    }).compile();

    authService = defaultRef.get<AuthService>(AuthService);
    authController = defaultRef.get<AuthController>(AuthController);
  });

  describe('Auth Scenarios', () => {
    it('should return a success on login', async () => {
      jest.spyOn(authService, 'login');

      const req = {
        hash: 'xxxxxxxxxx',
        pin: 1233,
      } as AuthDto;
      await authController.login(req);

      expect(authService.login).toBeCalled();
    });

    it('should return a success on validateFinger', async () => {
      jest.spyOn(authService, 'validateFinger');

      const req = {
        finger_hash: 'xxxxxxxxxx',
      } as FingerCheckDto;
      await authController.fingerCheck(req);

      expect(authService.validateFinger).toBeCalled();
    });
  });
});
