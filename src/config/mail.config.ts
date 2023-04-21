import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

export const getMailConfig = async (
  configService: ConfigService,
): Promise<any> => {
  const user = configService.get('SMTP_USER');
  const pass = configService.get('SMTP_PASSWORD');

  const transport = `smtps://${user}:${pass}@smtp.gmail.com`;

  return {
    transport,
    defaults: {
      from: `project-dev-way <${user}>`,
    },
    template: {
      dir: join(__dirname, '../services/mail/templates'),
      adapter: new EjsAdapter(),
      options: {
        strict: false,
      },
    },
  };
};
