import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import * as firebase from 'firebase-admin';
import { UserService } from 'src/resources/user/user.service';
import { FirebaseApp } from 'src/services/firebase/firebase-app';
import { TelegramService } from 'src/services/telegram/telegram.service';
import { ExpressRequestGoogle } from 'src/types/expressRequestGoogle.interface';

@Injectable()
export class FirebaseMiddleware implements NestMiddleware {
  private frbAuth: firebase.auth.Auth;

  constructor(
    private readonly firebaseApp: FirebaseApp,
    private readonly userService: UserService,
    private readonly telegramService: TelegramService,
  ) {
    this.frbAuth = this.firebaseApp.getAuth();
  }

  use(req: ExpressRequestGoogle, res: Response, next: () => void) {
    const token = req.headers.authorization;
    if (token != null && token != '') {
      this.frbAuth
        .verifyIdToken(token.replace('Bearer ', ''))
        .then(async (decodedToken) => {
          const email = decodedToken.email;
          console.log('--- FirebaseMiddleware ', { email });

          // const user = await this.userService.findByEmail(email);
          // if (!user) {
          // user = await this.userService.create({ email });
          // }
          // req.email = email;
          req.user = {};
          req.user.email = email;
          // console.log('--- firebaseMiddleware user', user);
          // const message =
          //   `--- server ---  /n` +
          //   `firebaseMiddleware /n` +
          //   `email: ${user.email}`;
          // await this.telegramService.sendMessage(message);
          next();
        })
        .catch((error) => {
          console.error(error);
          this.accessDenied(req.url, res);
        });
    } else {
      next();
    }
  }

  private accessDenied(url: string, res: Response) {
    res.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: url,
      message: 'Access Denied',
    });
  }
}
