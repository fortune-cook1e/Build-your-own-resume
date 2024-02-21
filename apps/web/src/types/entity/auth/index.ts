import { z } from 'zod';
import { userEntitySchema } from '../user';

export const loginEntitySchema = z.object({
  status: z.enum(['authenticated']),
  user: userEntitySchema,
});

export type LoginEntity = z.infer<typeof loginEntitySchema>;
