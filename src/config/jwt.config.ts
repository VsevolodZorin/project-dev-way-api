import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfigFactory = async (
  configService: ConfigService,
): Promise<JwtModuleOptions> => {
  return {
    secret: configService.get('JWT_ACCESS_SECRET'),
    signOptions: {
      expiresIn: configService.get('JWT_ACCESS_EXPIRESIN'),
    },
  };
};
