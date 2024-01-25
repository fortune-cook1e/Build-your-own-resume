import { z } from 'zod';

export const configSchema = z.object({
  REDIS_URL: z.string().url(),
  REDIS_DEFAULT_TTL: z.string(),

  PORT: z.string(),
});

export type Config = z.infer<typeof configSchema>;
