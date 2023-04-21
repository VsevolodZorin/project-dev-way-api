import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface EmailActivationEntity extends Base {}

export class EmailActivationEntity extends TimeStamps {
  @prop({ unique: true, required: true })
  email: string;
  @prop({ unique: true, required: true })
  activationLink: string;
}
