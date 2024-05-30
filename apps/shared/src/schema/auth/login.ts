import { userSchema, usernameSchema } from '../user/user';
import { z } from 'zod';
import { ErrorMessage } from '../../constant';
import { createZodDto } from '@/utils';

export const loginResSchema = z.object({
  status: z.enum(['authenticated']),
  user: userSchema,
});

export type LoginRes = z.infer<typeof loginResSchema>;

export const loginDtoSchema = z
  .object({
    identifier: z.string().min(2),
    password: z.string().min(6),
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
