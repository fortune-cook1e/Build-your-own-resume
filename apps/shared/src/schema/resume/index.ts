import { z } from 'nestjs-zod/z';

import { defaultSections, sectionsSchema } from '@/schema/resume/sections';
import { basicsSchema, defaultBasics } from '@/schema/resume/basics';
import { idSchema } from '@/schema/resume/common';

export const resumeDataSchema = z.object({
  basics: basicsSchema,
  sections: sectionsSchema,
});

// default resume data
export const defaultResumeData: ResumeData = {
  basics: defaultBasics,
  sections: defaultSections,
};

export type ResumeData = z.infer<typeof resumeDataSchema>;

export const resumeSchema = z.object({
  id: idSchema,
  title: z.string(),
  data: resumeDataSchema.default(defaultResumeData),
  visibility: z.enum(['public', 'private']).default('public'),
  // userId: idSchema,
  // user: userEntitySchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ResumeDto = z.infer<typeof resumeSchema>;

export * from './basics';
export * from './common';
export * from './sections';
export * from './sample';
export * from './sample';
