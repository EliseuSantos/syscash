import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FingerCheckDto {
  @ApiProperty({
    description: 'Hash of finger',
    example: 'r28r47937t793t79637695t',
  })
  @IsString()
  finger_hash: string;
}
