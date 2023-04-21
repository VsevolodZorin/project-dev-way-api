import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface PermissionEntity extends Base {}

export class PermissionEntity extends TimeStamps {
  @prop({ unique: true, required: true })
  userId: string;

  @prop({ required: true })
  roleId: string;
}
