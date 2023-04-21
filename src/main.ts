if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: true, credentials: true },
  });
  app.use(cookieParser());
  // app.useGlobalPipes(new ValidationPipe());
  await app.listen(4000, () => {
    console.log('server start at port 4000');
  });
  // app.setGlobalPrefix('api');
  app.enableCors({ origin: true });
}

bootstrap();
