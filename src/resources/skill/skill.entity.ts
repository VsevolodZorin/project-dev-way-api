import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('skills')
@Unique(['name'])
export class SkillEntity {
  @ApiProperty({
    description: 'Primary key. Auto incrementing int',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'skill name',
    example: 'Nest.js',
    default: 'Nest.js',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'skill icon',
    example: 'url',
    default: 'url',
  })
  @Column()
  img: string;
}
