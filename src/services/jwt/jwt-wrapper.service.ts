import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from 'src/services/jwt/types/jwt-payload.interface';

@Injectable()
export class JwtWrapperService {
  constructor(
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  validateAccessToken(token: string): IJwtPayload {
    return this.jwtService.verify(token, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
    });
  }
  validateRefreshToken(token: string): IJwtPayload {
    return this.jwtService.verify(token, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
    });
  }
}
