import { z } from 'zod';
import { userEntitySchema } from './user.entity';

export const loginEntitySchema = z.object({
  status: z.enum(['authenticated']),
  user: userEntitySchema,
});

export type LoginEntity = z.infer<typeof loginEntitySchema>;
