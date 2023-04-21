import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { RoleService } from 'src/resources/role/role.service';
import { IUserFindOptions } from 'src/resources/user/types/userFindOptons.interface';
import { IUserResponse } from 'src/resources/user/types/userResponse.Interface';
import { UserEntity } from 'src/resources/user/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { genSalt, hash } from 'bcryptjs';
import { RolesEnum } from '../role/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity)
    private readonly userRepository: ModelType<UserEntity>,
    private readonly roleService: RoleService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const errorResponse = {
      errors: {},
    };

    const userByEmail = await this.userRepository
      .findOne({
        email: createUserDto.email,
      })
      .exec();

    if (userByEmail) {
      errorResponse.errors['email'] = 'has already been taken';
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    let role = await this.roleService.findByName(RolesEnum.USER);
    if (!role) {
      role = await this.roleService.create({ name: RolesEnum.USER });
    }

    // TODO role name or id
    const newUser = new this.userRepository();

    const salt = await genSalt(10);
    const passwordHash = await hash(createUserDto.password, salt);

    Object.assign(
      newUser,
      createUserDto,
      { roles: [role.name] },
      { password: passwordHash },
    );

    const savedUser = await newUser.save();
    delete savedUser.password;
    return savedUser;
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find().exec();
  }

  async findById(
    id: string,
    findOptons: IUserFindOptions = {},
  ): Promise<UserEntity> {
    return this.userRepository.findById(id, findOptons).exec();
  }

  async findByEmail(
    email: string,
    findOptons: IUserFindOptions = {},
  ): Promise<UserEntity> {
    return this.userRepository.findOne({ email }, findOptons).exec();
  }

  async findByEmailLean(
    email: string,
    findOptons: IUserFindOptions = {},
  ): Promise<UserEntity> {
    return this.userRepository.findOne({ email }, findOptons).lean().exec();
  }

  async updateById(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.userRepository.findByIdAndUpdate(id, updateUserDto).exec();
  }

  async updateByEmail(
    email: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.userRepository
      .findOneAndUpdate({ email }, updateUserDto)
      .exec();
  }

  async remove(id: string): Promise<any> {
    return this.userRepository.findByIdAndDelete(id).exec();
  }

  // todo user.find().lean() as js obj
  buildUserResponse(user: UserEntity, accessToken?: string): IUserResponse {
    const { id, email, isActivated, firstName, lastName, roles } = user;
    return {
      user: {
        id,
        email,
        isActivated,
        firstName,
        lastName,
        roles,
      },
      accessToken,
    };
  }
}
