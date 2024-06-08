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
    identifier: z.string().min(6),
    password: z.string().min(6),
  })
  .superRefine((data, ctx) => {
    if (data.identifier.includes('@')) {
      const emailResult = z.string().email().min(10).safeParse(data.identifier);
      if (!emailResult.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: emailResult.error.errors[0]?.message || 'Invalid email',
          path: ['identifier'],
        });
      }
    } else {
      const usernameResult = usernameSchema.safeParse(data.identifier);
      if (!usernameResult.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            usernameResult.error.errors[0]?.message ||
            ErrorMessage.InvalidCredentials,
          path: ['identifier'],
        });
      }
    }
  });

export class LoginDto extends createZodDto(loginDtoSchema) {}
