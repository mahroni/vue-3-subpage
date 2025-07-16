import { z } from 'zod';

import { createApiResponseSchemaPagination } from '../common';

export const QiscusChannelSchema = z.object({
  app_code: z.string(),
  badge_url: z.string().nullable(),
  id: z.number(),
  is_active: z.boolean(),
  is_secure: z.boolean(),
  secret_key: z.string(),
  name: z.string(),
  widget_version: z.string(),
});

export const QiscusChannelListSchema = z.array(QiscusChannelSchema);

export const QiscusChannelResponseSchema =
  createApiResponseSchemaPagination(QiscusChannelListSchema);

export type QiscusChannel = z.infer<typeof QiscusChannelSchema>;
export type QiscusChannelList = z.infer<typeof QiscusChannelListSchema>;
export type QiscusChannelResponse = z.infer<typeof QiscusChannelResponseSchema>;
