import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSkillDto {
  @ApiProperty({
    description: 'skill name',
    example: 'Nest.js',
    default: 'Nest.js',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'skill icon',
    example: 'url',
    default: 'url',
  })
  @IsNotEmpty()
  url: string;
}
