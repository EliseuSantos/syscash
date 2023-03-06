import { UsersService } from '@domain/services/user';
import { Module } from '@nestjs/common';

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
