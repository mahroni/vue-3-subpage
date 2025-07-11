import { z } from 'zod';

import { createApiResponseSchema } from './common';

// Zod schema for Qiscus channel detail response
export const QiscusChannelSchema = z.object({
  app_code: z.string(),
  badge_url: z.string().nullable(),
  id: z.number(),
  is_active: z.boolean(),
  is_secure: z.boolean(),
  name: z.string(),
  secret_key: z.string(),
  widget_version: z.string(),
  configs: z
    .object({
      is_enabled: z.boolean(),
    })
    .optional(),
});

export const QiscusDetailDataSchema = z.object({
  qiscus_channel: QiscusChannelSchema,
});

export const QiscusDetailResponseSchema = createApiResponseSchema(QiscusDetailDataSchema);

// TypeScript types derived from Zod schemas
export type QiscusChannel = z.infer<typeof QiscusChannelSchema>;
export type QiscusDetailData = z.infer<typeof QiscusDetailDataSchema>;
export type QiscusDetailResponse = z.infer<typeof QiscusDetailResponseSchema>;
