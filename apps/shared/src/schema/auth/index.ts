import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';
import { ErrorMessage } from '@/constant';
import { userSchema, usernameSchema } from '@/schema/user';

export const jwtPayloadSchema = userSchema.pick({
  id: true,
  email: true,
});

export type JwtPayload = z.infer<typeof jwtPayloadSchema>;

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

export * from './register';
export * from './message';
