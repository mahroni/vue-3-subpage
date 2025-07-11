import { z } from 'zod';

import { createApiResponseSchema } from './common';

export const botDataSchema = z.object({
  bot_webhook_url: z.url(),
  is_bot_enabled: z.boolean(),
  is_force_send_bot: z.boolean(),
});

export const botResponseSchema = createApiResponseSchema(botDataSchema);

export type BotData = z.infer<typeof botDataSchema>;
export type BotResponse = z.infer<typeof botResponseSchema>;
