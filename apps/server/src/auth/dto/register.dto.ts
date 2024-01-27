import { userSchema } from '@/server/user/dto/user.dto';
import { z } from 'zod';

export const registerSchema = userSchema.pick({
  name: true,
  username: true,
  email: true,
  password: true,
});

export type RegisterDto = z.infer<typeof registerSchema>;
