import { FingerCheckDto } from '@application/dtos/auth';
import { AuthDto } from '@application/dtos/auth/authDto';
import { AuthService } from '@domain/services/auth';
import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Login',
  })
  @ApiBody({ type: AuthDto })
  @Post()
  async login(
    @Body()
    authDto: AuthDto,
  ) {
    return this.authService.login(authDto);
  }

  @ApiOperation({
    summary: 'Finger validate',
  })
  @ApiBody({ type: FingerCheckDto })
  @Post('finger-check')
  async fingerCheck(
    @Body()
    fingerCheckDto: FingerCheckDto,
  ) {
    return this.authService.validateFinger(fingerCheckDto.finger_hash);
  }
}
