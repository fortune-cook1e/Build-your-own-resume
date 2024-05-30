import { createZodDto } from '@/utils';
import { userSchema } from '../user/user';
import { z } from 'zod';

export const registerSchema = userSchema
  .pick({
    name: true,
    username: true,
    email: true,
  })
  .extend({
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export class RegisterDto extends createZodDto(registerSchema) {}
