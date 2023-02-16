import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DevService } from './dev.service';
import { CreateDevDto } from './dto/create-dev.dto';
import { UpdateDevDto } from './dto/update-dev.dto';

@Controller('dev')
export class DevController {
  constructor(private readonly devService: DevService) {}

  @Post()
  create(@Body() createDevDto: CreateDevDto) {
    return this.devService.create(createDevDto);
  }

  @Get()
  findAll() {
    return this.devService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.devService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDevDto: UpdateDevDto) {
    return this.devService.update(+id, updateDevDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.devService.remove(+id);
  }
}
