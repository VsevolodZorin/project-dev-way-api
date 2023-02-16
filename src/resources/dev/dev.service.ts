import { Injectable } from '@nestjs/common';
import { CreateDevDto } from './dto/create-dev.dto';
import { UpdateDevDto } from './dto/update-dev.dto';

@Injectable()
export class DevService {
  create(createDevDto: CreateDevDto) {
    return 'This action adds a new dev';
  }

  findAll() {
    return `This action returns all dev`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dev`;
  }

  update(id: number, updateDevDto: UpdateDevDto) {
    return `This action updates a #${id} dev`;
  }

  remove(id: number) {
    return `This action removes a #${id} dev`;
  }
}
