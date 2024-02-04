import { z } from 'zod';

export const userEntitySchema = z.object({
  id: z.string().cuid2(),
  name: z.string(),
  username: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  email: z.string().email(),
  emailVerified: z.boolean().default(false),
});

export type UserEntity = z.infer<typeof userEntitySchema>;
