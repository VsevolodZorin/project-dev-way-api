import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypegooseModule } from 'nestjs-typegoose';
import { join } from 'path';
import { AuthMiddleware } from 'src/common/middleware/auth.middleware';
import { FirebaseMiddleware } from 'src/common/middleware/firebase.middleware';
import { getMongoConfig } from 'src/config/mongo.config';
import { getTelegramConfig } from 'src/config/telegram.config';
import { AuthModule } from 'src/resources/auth/auth.module';
import { EmailActivationModule } from 'src/resources/emailActivation/emailActivation.module';
import { SessionModule } from 'src/resources/session/sessoin.module';
import { FirebaseApp } from 'src/services/firebase/firebase-app';
import { JwtModule } from 'src/services/jwt/jwt.module';
// import { MailModule } from 'src/services/mail/mail.module';
import { PermissionModule } from './resources/permission/permission.module';
import { RoleModule } from './resources/role/role.module';
import { UserModule } from './resources/user/user.module';
import { TelegramModule } from './services/telegram/telegram.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,
    EmailActivationModule,
    TelegramModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTelegramConfig,
    }),
    SessionModule,
    JwtModule,
    // MailModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'assets'),
      // exclude: ['/api*'],
      exclude: ['/*'],
      // serveStaticOptions: {
      //   redirect: false,
      //   index: false,
      // },
    }),
  ],
  controllers: [],
  providers: [FirebaseApp],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/auth/registration', method: RequestMethod.POST },
        { path: '/auth/login', method: RequestMethod.POST },
        // { path: '/auth/refresh', method: RequestMethod.POST },
      )
      .forRoutes(
        {
          path: '*',
          method: RequestMethod.POST,
        },
        {
          path: '*',
          method: RequestMethod.PATCH,
        },
        {
          path: '*',
          method: RequestMethod.DELETE,
        },
      );
    consumer
      .apply(FirebaseMiddleware)
      .exclude({
        path: '*',
        method: RequestMethod.GET,
      })
      .forRoutes(
        {
          path: 'auth/loginwithgoogle',
          method: RequestMethod.GET,
        },
        // {
        //   path: '*',
        //   method: RequestMethod.POST,
        // },
        // {
        //   path: '*',
        //   method: RequestMethod.PATCH,
        // },
        // {
        //   path: '*',
        //   method: RequestMethod.DELETE,
        // },
      );
  }
}
