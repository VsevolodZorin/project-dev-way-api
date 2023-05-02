import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { SkillEntity } from './skill.entity';
import { JwtWrapperModule } from 'src/services/jwt/jwt-wrapper.module';

@Module({
  imports: [TypeOrmModule.forFeature([SkillEntity]), JwtWrapperModule],
  controllers: [SkillController],
  providers: [SkillService],
})
export class SkillModule {}
