import { z } from 'zod';
import { userSchema } from './../../user/dto/user.dto';

export const payloadSchema = userSchema.pick({
  id: true,
  email: true,
});

export type Payload = z.infer<typeof payloadSchema>;
