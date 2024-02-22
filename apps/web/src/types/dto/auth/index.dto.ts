import { userEntitySchema } from '@/web/types/entity/user';
import { z } from 'zod';

export const loginDtoSchema = z.object({
  identifier: z.string().email().or(z.string()),
  password: z.string().min(6),
});

export const registerSchema = userEntitySchema
  .pick({
    name: true,
    username: true,
    email: true,
  })
  .extend({
    password: z.string().min(6),
  });

export type LoginDto = z.infer<typeof loginDtoSchema>;
export type RegisterDto = z.infer<typeof registerSchema>;
