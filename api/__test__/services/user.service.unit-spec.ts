import { UsersService } from '@domain/services/user';
import { Test } from '@nestjs/testing';

let userService: UsersService;

describe('User service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    const defaultRef = await Test.createTestingModule({
      providers: [UsersService],
      imports: [],
      exports: [UsersService],
    }).compile();

    await defaultRef.createNestApplication().init();
    userService = defaultRef.get<UsersService>(UsersService);
  });

  describe('User Scenarios', () => {
    it('Should return success on findByHash', async () => {
      const result = await userService.findByHash(
        '4443458724952476522er2efdfdf245',
      );

      expect(result._id).toBeDefined();
    });

    it('Should return success on findByHasAndPin', async () => {
      const result = await userService.findByHasAndPin(
        '4443458724952476522er2efdfdf245',
        1098,
      );

      expect(result._id).toBeDefined();
    });
  });
});
