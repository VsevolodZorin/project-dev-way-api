import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface UserEntity extends Base {}

export class UserEntity extends TimeStamps {
  @prop({ unique: true })
  email: string;

  @prop({ default: '' })
  firstName: string;

  @prop({ default: '' })
  lastName: string;

  @prop()
  password: string;

  @prop({ type: () => [String] })
  roles: string[];

  @prop({ default: false })
  isActivated: boolean;
}
