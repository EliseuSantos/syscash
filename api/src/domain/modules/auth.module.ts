import { AuthController } from '@application/controllers/auth.controller';
import { JwtStrategy } from '@application/strategies/jwt.strategy';
import { AuthService } from '@domain/services/auth';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from './users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? '',
      secretOrPrivateKey: process.env.JWT_SECRET ?? '',
      signOptions: { expiresIn: '1260s' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
