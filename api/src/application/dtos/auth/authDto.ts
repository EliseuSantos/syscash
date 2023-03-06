import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    description: 'Hash of finger',
    example: 'r28r47937t793t79637695t',
  })
  @IsString()
  hash: string;

  @ApiProperty({
    description: 'Pin CODE',
    example: 1223,
  })
  @IsInt()
  pin: number;
}
