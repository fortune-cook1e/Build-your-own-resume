import { z } from 'nestjs-zod/z';
import { userSchema } from '@/schema/user';

export const jwtPayloadSchema = userSchema.pick({
  id: true,
  email: true,
});

export type JwtPayload = z.infer<typeof jwtPayloadSchema>;

export * from './register';
export * from './message';
export * from './login';
