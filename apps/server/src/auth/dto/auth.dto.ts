import { z } from 'nestjs-zod/z';
import { userSchema } from './../../user/dto/user.dto';

export const payloadSchema = userSchema.pick({
  id: true,
  email: true,
});

export type Payload = z.infer<typeof payloadSchema>;

export const authorizationSchema = z.object({
  status: z.enum(['authenticated']),
  user: userSchema,
});
