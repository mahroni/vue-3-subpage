import z from 'zod';

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

export const QiscusDetailResponseSchema = z.object({
  data: z.object({
    qiscus_channel: QiscusChannelSchema,
  }),
  status: z.number(),
});

// TypeScript types derived from Zod schemas
export type QiscusChannel = z.infer<typeof QiscusChannelSchema>;
export type QiscusDetailResponse = z.infer<typeof QiscusDetailResponseSchema>;
