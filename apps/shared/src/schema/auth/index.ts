import { z } from 'zod';
import { userSchema } from '../user';

export const jwtPayloadSchema = userSchema.pick({
  id: true,
  email: true,
});

export type JwtPayload = z.infer<typeof jwtPayloadSchema>;

export * from './register';
export * from './message';
export * from './login';
