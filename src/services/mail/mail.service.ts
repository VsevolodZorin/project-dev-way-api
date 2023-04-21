import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
//  export class MailService {
class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendActivationMail(to: string, activationLink: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Welcome to project-dev-way! Confirm your Email',
      text: 'test text',
      // template: 'activationMail', // `.hbs` extension is appended automatically
      context: {
        activationLink,
      },
    });
  }
}
