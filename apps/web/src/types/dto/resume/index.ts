import {
  defaultResumeData,
  resumeDataSchema,
  idSchema,
} from '@fe-cookie/resume-generator-utils';
import { userEntitySchema } from '@/types/entity/user';
import { z } from 'zod';

export const resumeDtoSchema = z.object({
  id: idSchema,
  title: z.string(),
  data: resumeDataSchema.default(defaultResumeData),
  visibility: z.enum(['public', 'private']).default('public'),
  // userId: idSchema,
  // user: userEntitySchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ResumeDto = z.infer<typeof resumeDtoSchema>;
