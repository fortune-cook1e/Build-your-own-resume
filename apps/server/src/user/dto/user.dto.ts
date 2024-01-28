import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

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
  name: z.string().min(1).max(50).describe('User name'),
  username: usernameSchema,
  email: z.string().email(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const privateInfoSchema = z.object({
  id: idSchema,
  password: z.string().nullable(),
  salt: z.string().nullable(),
  refreshToken: z.string().nullable(),
  emailVerified: z.boolean().default(false),
  lastSignedIn: z.date().nullable(),
});

export const userWithPrivateSchema = userSchema.merge(privateInfoSchema);

export class UserDto extends createZodDto(userSchema) {}
export class PrivateInfoDto extends createZodDto(privateInfoSchema) {}
export class UserWithPrivateDto extends createZodDto(userWithPrivateSchema) {}
