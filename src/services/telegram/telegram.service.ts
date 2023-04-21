import { Inject, Injectable } from '@nestjs/common';
import { TELEGRAM_MODULE_OPTIONS } from 'src/services/telegram/telegram.constants';
import { ITelegramOptions } from 'src/services/telegram/types/telegram.interface';
import { Telegraf } from 'telegraf';

@Injectable()
export class TelegramService {
  bot: Telegraf;
  options: ITelegramOptions;

  constructor(@Inject(TELEGRAM_MODULE_OPTIONS) options: ITelegramOptions) {
    this.bot = new Telegraf(options.botToken);
    this.options = options;
  }

  async sendMessage(message: string, chatId: string = this.options.chatId) {
    try {
      await this.bot.telegram.sendMessage(chatId, message);
    } catch (e) {
      console.log('--- telegram sendMessage catch', e.message);
    }
  }
}
