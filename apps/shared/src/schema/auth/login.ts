import { ErrorMessage } from '@/constant';
import { userSchema, usernameSchema } from '@/schema/user';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const loginResSchema = z.object({
  status: z.enum(['authenticated']),
  user: userSchema,
});

export type LoginRes = z.infer<typeof loginResSchema>;

export const loginDtoSchema = z
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

export class LoginDto extends createZodDto(loginDtoSchema) {}
