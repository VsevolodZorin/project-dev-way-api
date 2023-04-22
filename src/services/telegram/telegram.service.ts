import { Inject, Injectable } from '@nestjs/common';
import { TELEGRAM_MODULE_OPTIONS } from 'src/services/telegram/telegram.constants';
import { ITelegramOptions } from 'src/services/telegram/types/telegram.interface';
import { Telegraf } from 'telegraf';

interface ITelegramMessage {
  [key: string]: string | string[];
  message: string;
}
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

  /**
   * @description send object to telegram chat. Object keys will be used as new lines
   */
  async sendObject(
    inputObj: ITelegramMessage,
    chatId: string = this.options.chatId,
  ) {
    try {
      let result = `--- ${inputObj.message} ---\n`;
      const keys = Object.keys(inputObj);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (key === 'message') {
          continue;
        }
        const value = inputObj[key];
        result += `${key}: ${value}\n`;
      }
      await this.bot.telegram.sendMessage(chatId, result);
    } catch (e) {
      console.log('--- telegram sendMessage catch', e.message);
    }
  }
}
