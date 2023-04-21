import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface SessionEntity extends Base {}

export class SessionEntity extends TimeStamps {
  @prop({ required: true, unique: true })
  userId: string;

  @prop({ required: true })
  refreshToken: string;
}
