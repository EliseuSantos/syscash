import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class RequestCashOutDto {
  @ApiProperty({
    description: 'Amount to cashout',
    example: '120',
  })
  @IsInt()
  @Min(20)
  @Max(99999)
  @IsNotEmpty()
  amount: number;
}
