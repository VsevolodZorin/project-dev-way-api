import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseApp {
  private firebaseApp: firebase.app.App;

  constructor(private readonly configService: ConfigService) {
    const firebase_params = {
      type: this.configService.get('TYPE'),
      projectId: this.configService.get('PROJECT_ID'),
      privateKeyId: this.configService.get('PRIVATE_KEY_ID'),
      privateKey: this.configService.get('PRIVATE_KEY').replace(/\\n/g, '\n'),
      clientEmail: this.configService.get('CLIENT_EMAIL'),
      clientId: this.configService.get('CLIENT_ID'),
      authUri: this.configService.get('AUTH_URI'),
      tokenUri: this.configService.get('TOKEN_URI'),
      authProviderX509CertUrl: this.configService.get(
        'AUTH_PROVIDER_X509_CERT_URL',
      ),
      clientC509CertUrl: this.configService.get('CLIENT_X509_CERT_URL'),
    };

    this.firebaseApp = firebase.initializeApp({
      credential: firebase.credential.cert(firebase_params),
      // databaseURL: '',
    });
  }

  getAuth = (): firebase.auth.Auth => {
    return this.firebaseApp.auth();
  };

  // firestore = (): firebase.firestore.Firestore => {
  //   return this.firebaseApp.firestore();
  // }
}
