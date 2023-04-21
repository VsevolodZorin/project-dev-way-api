import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum RolesEnum {
  ADMIN = 'admin',
  USER = 'user',
}

export interface RoleEntity extends Base {}

export class RoleEntity extends TimeStamps {
  @prop({ unique: true, required: true, enum: RolesEnum })
  name: RolesEnum;
}
