import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      _id: '1',
      username: 'john',
      password: 1234,
      hash: '23458724952476527645769245',
    },
    {
      _id: '2',
      username: 'maria',
      password: 1098,
      hash: '4443458724952476522er2efdfdf245',
    },
  ];

  async findByHash(hash: string): Promise<User | undefined> {
    return this.users.find((user) => user.hash === hash);
  }

  async findByHasAndPin(hash: string, pin: number): Promise<User | undefined> {
    return this.users.find(
      (user) => user.hash === hash && user.password === pin,
    );
  }
}
