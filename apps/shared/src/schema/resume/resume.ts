import { z } from 'zod';

import { defaultSections, sectionsSchema } from './sections';
import { basicsSchema, defaultBasics } from './sections/basics';
import { idSchema } from './common';
import { userSchema } from '@/schema/user';
import { defaultMetadata, metadataSchema } from '@/schema/resume/metadata';

export const resumeDataSchema = z.object({
  basics: basicsSchema,
  sections: sectionsSchema,
  metadata: metadataSchema,
});

// default resume data
export const defaultResumeData: ResumeData = {
  basics: defaultBasics,
  sections: defaultSections,
  metadata: defaultMetadata,
};

export type ResumeData = z.infer<typeof resumeDataSchema>;

export const resumeSchema = z.object({
  id: idSchema,
  title: z.string(),
  data: resumeDataSchema.default(defaultResumeData),
  description: z.string(),
  visibility: z.enum(['public', 'private']).default('public'),
  userId: idSchema,
  user: userSchema.optional(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
});

export type Resume = z.infer<typeof resumeSchema>;
