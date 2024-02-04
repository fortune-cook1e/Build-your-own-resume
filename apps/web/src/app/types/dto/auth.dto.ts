import { z } from 'zod';

export const loginDtoSchema = z.object({
  identifier: z.string().email().or(z.string()),
  password: z.string().min(6),
});

export type LoginDto = z.infer<typeof loginDtoSchema>;
