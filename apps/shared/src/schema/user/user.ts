import { idSchema } from '../resume';
import { z } from 'zod';
import { createZodDto } from '@/utils';

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
  avatar: z.string(),
  email: z.string().email(),
  createdAt: z.date(),
  updatedAt: z.date(),
  emailVerified: z.boolean().default(false),
});

export const privateInfoSchema = z.object({
  password: z.string().nullable(),
  salt: z.string().nullable(),
  refreshToken: z.string().nullable(),
  lastSignedIn: z.date().nullable(),
});

export const userWithPrivateSchema = userSchema.merge(privateInfoSchema);
export const userListSchema = z.array(userSchema);
export const userWithPrivateListSchema = z.array(userWithPrivateSchema);

export class User extends createZodDto(userSchema) {}
export class PrivateInfo extends createZodDto(privateInfoSchema) {}
export class UserWithPrivateInfo extends createZodDto(userWithPrivateSchema) {}
