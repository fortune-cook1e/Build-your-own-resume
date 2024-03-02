import { idSchema } from '@/schema/resume';
import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

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

export class UserDto extends createZodDto(userSchema) {}
export class PrivateInfoDto extends createZodDto(privateInfoSchema) {}
export class UserWithPrivateDto extends createZodDto(userWithPrivateSchema) {}
