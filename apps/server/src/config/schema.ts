import { z } from 'nestjs-zod/z';

export const configSchema = z.object({
  REDIS_URL: z.string().url().startsWith('redis://').optional(),
  REDIS_PASSWORD: z.string().default('mypassword'),
  REDIS_NAMESPACE: z.string().default('resume-generator'),

  PORT: z.coerce.number().default(3000),

  DATABASE_URL: z.string().url().startsWith('postgresql://'),

  POSTGRES_USER: z.string().default('postgres'),
  POSTGRES_PASSWORD: z.string().default('postgres'),
  POSTGRES_DB: z.string().default('mydb'),

  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),

  MAIL_FROM: z.string(),
  SMTP_URL: z.string().startsWith('smtp://').optional(),

  QINIU_BUCKET: z.string(),
  QINIU_ACCESS_KEY: z.string(),
  QINIU_SECRET_KEY: z.string(),
  QINIU_DOMAIN: z.string(),

  WEB_APP_URL: z.string().default('localhost:8080/resume-generator-web'),
});

export type Config = z.infer<typeof configSchema>;
