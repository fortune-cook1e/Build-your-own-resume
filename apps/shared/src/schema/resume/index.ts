import { z } from 'zod';

import { defaultSections, sectionsSchema } from '@/schema/resume/sections';
import { basicsSchema, defaultBasics } from '@/schema/resume/basics';

export const resumeDataSchema = z.object({
  basics: basicsSchema,
  sections: sectionsSchema,
});

// Type
export type ResumeData = z.infer<typeof resumeDataSchema>;

// Defaults
export const defaultResumeData: ResumeData = {
  basics: defaultBasics,
  sections: defaultSections,
};

export * from './basics';
export * from './common';
export * from './sections';
export * from './sample';
