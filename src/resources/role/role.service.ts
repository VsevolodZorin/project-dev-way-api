import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { RoleEntity } from 'src/resources/role/role.entity';
import { CreateRoleDto } from './dto/createRole.dto';
import { UpdateRoleDto } from './dto/updateRole.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(RoleEntity)
    private readonly roleRepository: ModelType<RoleEntity>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    const errorResponse = {
      errors: {},
    };

    const roleByName = await this.roleRepository
      .findOne({
        name: createRoleDto.name,
      })
      .exec();
    if (roleByName) {
      errorResponse.errors['role'] = 'has already been taken';
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const newRole = new this.roleRepository(createRoleDto);
    return await newRole.save();
  }

  async findAll(): Promise<RoleEntity[]> {
    return await this.roleRepository.find().exec();
  }

  // async findOne(id: string): Promise<RoleEntity> {
  //   return await this.roleRepository.findById(id);
  // }

  async findById(id: string): Promise<RoleEntity> {
    return await this.roleRepository.findById(id).exec();
  }

  async findByName(name: string): Promise<RoleEntity> {
    return await this.roleRepository.findOne({ name }).exec();
  }

  // todo updare role
  async update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  // todo remove role
  async remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
