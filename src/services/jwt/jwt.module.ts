import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SessionModule } from 'src/resources/session/sessoin.module';
import { JwtService } from 'src/services/jwt/jwt.service';

@Module({
  imports: [ConfigModule, SessionModule],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
