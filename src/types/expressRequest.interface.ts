import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface ExpressRequest extends Request {
  user?: JwtPayload;
}
