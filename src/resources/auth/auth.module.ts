import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailActivationModule } from 'src/resources/emailActivation/emailActivation.module';
import { UserModule } from 'src/resources/user/user.module';
import { JwtModule } from 'src/services/jwt/jwt.module';
// import { MailModule } from 'src/services/mail/mail.module';
import { TelegramModule } from 'src/services/telegram/telegram.module';
import { SessionModule } from '../session/sessoin.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule,
    EmailActivationModule,
    UserModule,
    JwtModule,
    SessionModule,
    TelegramModule,
    // MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
