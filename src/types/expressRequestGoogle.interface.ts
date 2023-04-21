import { Request } from 'express';
import { UserEntity } from 'src/resources/user/user.entity';

export interface ExpressRequestGoogle extends Request {
  user: Partial<UserEntity>;
}
