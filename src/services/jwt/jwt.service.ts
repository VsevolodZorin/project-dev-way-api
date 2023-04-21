import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { SessionEntity } from 'src/resources/session/session.entity';
import { SessionService } from 'src/resources/session/session.service';
import { UserEntity } from 'src/resources/user/user.entity';
import { IJwtPayload } from 'src/services/jwt/types/jwtPayload.interface';
import { IJwtTokenPair } from 'src/services/jwt/types/jwtTokenPair.interface';

@Injectable()
export class JwtService {
  constructor(
    private readonly configService: ConfigService,
    private readonly sessionService: SessionService,
  ) {}

  async generateTokenPair(user: UserEntity): Promise<IJwtTokenPair> {
    const payload: IJwtPayload = {
      id: user.id,
      email: user.email,
      roles: user.roles,
      isActivated: user.isActivated,
    };
    const accessToken = jwt.sign(
      payload,
      this.configService.get('JWT_ACCESS_SECRET'),
      { expiresIn: this.configService.get('JWT_ACCESS_EXPIRESIN') },
    );
    const refreshToken = jwt.sign(
      payload,
      this.configService.get('JWT_REFRESH_SECRET'),
      { expiresIn: this.configService.get('JWT_REFRESH_EXPIRESIN') },
    );

    await this.saveToken(user.id, refreshToken);
    console.log('--- generateTokenPair pair', {
      accessToken,
      refreshToken,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token: string): IJwtPayload {
    try {
      const userData = jwt.verify(
        token,
        this.configService.get('JWT_ACCESS_SECRET'),
      );
      return userData as IJwtPayload;
    } catch (e) {
      throw new UnauthorizedException(e);
      // {
      //   "name": "TokenExpiredError",
      //   "message": "jwt expired",
      //   "expiredAt": "2022-02-11T22:12:54.000Z"
      // }

      // throw new UnauthorizedException(e.message);
      // {
      //   "statusCode": 401,
      //   "message": "jwt expired",
      //   "error": "Unauthorized"
      // }
    }
  }

  validateRefreshToken(token): IJwtPayload {
    try {
      const userData = jwt.verify(
        token,
        this.configService.get('JWT_REFRESH_SECRET'),
      );
      return userData as IJwtPayload;
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }

  // todo check
  async saveToken(userId, refreshToken): Promise<SessionEntity> {
    const session = await this.sessionService.findByUserId(userId);
    if (!session) {
      return await this.sessionService.create({ userId, refreshToken });
    }
    return this.sessionService.update({ userId, refreshToken });
  }

  // todo refactor return await
  async removeToken(userId: string) {
    const tokenData = await this.sessionService.delete(userId);
    console.log('--- remove token tokenData', tokenData);
    return tokenData;
  }

  async findToken(refreshToken: string): Promise<SessionEntity> {
    return await this.sessionService.findByRefreshToken(refreshToken);
  }
}
