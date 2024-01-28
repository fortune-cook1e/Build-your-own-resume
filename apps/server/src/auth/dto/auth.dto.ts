import { z } from 'nestjs-zod/z';
import { userSchema, usernameSchema } from './../../user/dto/user.dto';
import { createZodDto } from 'nestjs-zod';
import { ErrorMessage } from '@/server/constants';

export const payloadSchema = userSchema.pick({
  id: true,
  email: true,
});

export type Payload = z.infer<typeof payloadSchema>;

export const authorizationSchema = z.object({
  status: z.enum(['authenticated']),
  user: userSchema,
});

export const loginSchema = z
  .object({
    identifier: z.string(),
    password: z.password().min(6),
  })
  .refine(
    (value) => {
      if (value.identifier.includes('@')) {
        return z.string().email().parse(value.identifier);
      } else {
        return usernameSchema.parse(value.identifier);
      }
    },
    {
      message: ErrorMessage.InvalidCredentials,
    },
  );

export class LoginDto extends createZodDto(loginSchema) {}
