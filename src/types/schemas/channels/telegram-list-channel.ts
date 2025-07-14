import { z } from 'zod';

import { createApiResponseSchemaPagination } from '../common';

export const TelegramChannelSchema = z.object({
  badge_url: z.string().nullable(),
  bot_token: z.string(),
  id: z.number(),
  is_active: z.boolean(),
  username: z.string(),
  webhook_url: z.string().nullable(),
});

export const TelegramChannelListSchema = z.array(TelegramChannelSchema);

export const TelegramChannelResponseSchema =
  createApiResponseSchemaPagination(TelegramChannelListSchema);

export type TelegramChannel = z.infer<typeof TelegramChannelSchema>;
export type TelegramChannelList = z.infer<typeof TelegramChannelListSchema>;
export type TelegramChannelResponse = z.infer<typeof TelegramChannelResponseSchema>;
