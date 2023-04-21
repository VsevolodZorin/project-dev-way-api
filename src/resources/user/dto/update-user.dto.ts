import { PartialType } from '@nestjs/mapped-types';
import { UserEntity } from '../user.entity';

export class UpdateUserDto extends PartialType(UserEntity) {}
