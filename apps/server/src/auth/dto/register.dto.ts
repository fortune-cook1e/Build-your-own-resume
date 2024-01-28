import { userSchema } from '@/server/user/dto/user.dto';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const registerSchema = userSchema
  .pick({
    name: true,
    username: true,
    email: true,
  })
  .extend({
    password: z.string().min(6),
  });

export class RegisterDto extends createZodDto(registerSchema) {}
