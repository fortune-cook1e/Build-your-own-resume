import { basicsSchema, defaultBasics } from '@/web/types/entity/resume/basic';
import {
  defaultSections,
  sectionsSchema,
} from '@/web/types/entity/resume/sections';
import { z } from 'zod';

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
