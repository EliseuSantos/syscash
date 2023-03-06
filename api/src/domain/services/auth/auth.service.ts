import { AuthDto } from '@application/dtos/auth/authDto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../user';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateFinger(fingerHash: string): Promise<any> {
    try {
      const user = await this.usersService.findByHash(fingerHash);
      if (user && user.hash === fingerHash) {
        const { _id, password, ...result } = user;
        return result;
      }
      throw new UnauthorizedException();
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async login(authDto: AuthDto) {
    const user = await this.usersService.findByHasAndPin(
      authDto.hash,
      authDto.pin,
    );
    const payload = { username: user.username, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload, {
        privateKey: process.env.JWT_SECRET,
      }),
    };
  }
}
