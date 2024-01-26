import { z } from 'zod';

export const configSchema = z.object({
  REDIS_URL: z.string().url().startsWith('redis://').optional(),
  REDIS_DEFAULT_TTL: z.coerce.number().default(1).optional(),

  PORT: z.coerce.number().default(3000),

  DATABASE_URL: z.string().url().startsWith('postgresql://'),
});

export type Config = z.infer<typeof configSchema>;
