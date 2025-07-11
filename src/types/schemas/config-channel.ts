import { z } from 'zod';

import { createApiResponseSchema } from './common';

export const ConfigChannelSchema = z.object({
  is_enabled: z.boolean(),
  offline_message: z.string().nullable(),
  online_message: z.string().nullable(),
  send_offline_each_message: z.boolean(),
  send_online_if_resolved: z.boolean(),
});

export const ConfigChannelDataSchema = z.object({
  channel_config: ConfigChannelSchema,
});

export const ConfigChannelResponseSchema = createApiResponseSchema(ConfigChannelDataSchema);

export type ConfigChannel = z.infer<typeof ConfigChannelSchema>;
export type ConfigChannelData = z.infer<typeof ConfigChannelDataSchema>;
export type ConfigChannelResponse = z.infer<typeof ConfigChannelResponseSchema>;
