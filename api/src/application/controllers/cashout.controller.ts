import { RequestCashOutDto } from '@application/dtos/cashout';
import { JwtAuthGuard } from '@application/guards/jwt.guard';
import { CashOutService } from '@domain/services';
import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('CashOut')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cashouts')
export class CashOutController {
  constructor(private readonly cashoutService: CashOutService) {}

  @ApiOperation({
    summary: 'Request Cashout',
  })
  @ApiBody({ type: RequestCashOutDto })
  @Post('')
  async requestCashOut(
    @Request() req,
    @Body()
    requestCashoutDto: RequestCashOutDto,
  ) {
    return await this.cashoutService.requestCashOut(
      requestCashoutDto,
      req.user,
    );
  }
}
