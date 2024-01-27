import { z } from 'zod';

export const idSchema = z.string().cuid2().describe('Unique id');

export const usernameSchema = z
  .string()
  .min(3)
  .max(255)
  .regex(/^[a-z0-9._-]+$/, {
    message:
      'Usernames can only contain lowercase letters, numbers, periods, hyphens, and underscores.',
  });

export const userSchema = z.object({
  id: idSchema,
  name: z.string().min(1).max(50).describe('User name'),
  username: usernameSchema,
  email: z.string().email(),
  emailVerified: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
  password: z.string().min(6),
  salt: z.string(),
  refreshToken: z.string().optional(),
});

export type UserDto = z.infer<typeof userSchema>;
