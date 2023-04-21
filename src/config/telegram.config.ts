import { ConfigService } from '@nestjs/config';
import { ITelegramOptions } from 'src/services/telegram/types/telegram.interface';

export const getTelegramConfig = (
  configService: ConfigService,
): ITelegramOptions => {
  const botToken = configService.get('TELEGRAM_BOT_TOKEN');
  if (!botToken) {
    throw new Error('TELEGRAM_BOT_TOKEN not set');
  }
  return {
    botToken,
    chatId: configService.get('TELEGRAM_CHANNEL_ID'),
  };
};
