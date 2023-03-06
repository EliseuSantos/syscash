import { AuthDto } from '@application/dtos/auth/authDto';
import { AuthService } from '@domain/services/auth';
import { UsersService } from '@domain/services/user';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';

let userService: AuthService;
const mockUser = {
  _id: '1',
  username: 'john',
  password: 1234,
  hash: '23458724952476527645769245',
};

describe('Auth service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    const defaultRef = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByHasAndPin: jest.fn().mockImplementation(() => mockUser),
            findByHash: jest.fn().mockImplementation(() => mockUser),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('123123123123123'),
          },
        },
      ],
      imports: [],
      exports: [AuthService],
    }).compile();

    await defaultRef.createNestApplication().init();
    userService = defaultRef.get<AuthService>(AuthService);
  });

  describe('Auth Scenarios', () => {
    it('Should return success on validateFinger', async () => {
      const result = await userService.validateFinger(
        '23458724952476527645769245',
      );

      expect(result.hash).toBeDefined();
    });

    it('Should return success on login', async () => {
      const loginRequest = {
        hash: '23458724952476527645769245',
        pin: 1234,
      } as AuthDto;
      const result = await userService.login(loginRequest);

      expect(result.access_token).toBeDefined();
    });
  });
});
