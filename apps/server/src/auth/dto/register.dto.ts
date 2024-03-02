import { userSchema } from '@fe-cookie/resume-generator-utils';
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
