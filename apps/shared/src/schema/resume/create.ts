import { createZodDto } from '@/utils';
import { z } from 'zod';

export const createResumeSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  visibility: z.enum(['public', 'private']).default('private'),
});

export class CreateResumeDto extends createZodDto(createResumeSchema) {}
