import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillEntity } from './skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(SkillEntity)
    private skillRepository: Repository<SkillEntity>,
  ) {}
  create(createSkillDto: CreateSkillDto) {
    return 'This action adds a new skill';
  }

  findAll(): Promise<SkillEntity[]> {
    return this.skillRepository.find();
  }

  findOne(id: number): Promise<SkillEntity> {
    return this.skillRepository.findOneBy({ id });
  }

  update(id: number, updateSkillDto: UpdateSkillDto) {
    return `This action updates a #${id} skill`;
  }

  remove(id: number) {
    return `This action removes a #${id} skill`;
  }
}
