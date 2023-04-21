import {
  HttpException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { UserService } from 'src/resources/user/user.service';
import { JwtService } from 'src/services/jwt/jwt.service';
import { IJwtPayload } from 'src/services/jwt/types/jwtPayload.interface';
import { ExpressRequest } from 'src/types/expressRequest.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: ExpressRequest, _: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      throw new UnauthorizedException();
    }

    const accessToken = req.headers.authorization.split(' ')[1];
    if (!accessToken) {
      // todo create api error
      throw new UnauthorizedException('no token');
    }

    try {
      const jwtPayload: IJwtPayload =
        this.jwtService.validateAccessToken(accessToken);

      console.log('--- jwtService validate jwtPayload', jwtPayload);

      // todo user service add check
      // todo each error diagnosis service
      // const user = await this.userService.findById(jwtPayload._id);
      // console.log('authMiddleware user', user);
      req.user = jwtPayload;
      next();
    } catch (e) {
      throw new HttpException(e.getResponse(), e.getStatus());
    }
  }
}
