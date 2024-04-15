import { defaultItem } from './../common/item';
import { itemSchema } from '@/schema/resume/common';
import { z } from 'zod';

export const skillsSchema = itemSchema.extend({
  name: z.string(),
  description: z.string(),
  level: z.enum(['Expert', 'Proficient', 'Intermediate', 'Beginner']),
});

export type Skills = z.infer<typeof skillsSchema>;

export const defaultSkills: Skills = {
  ...defaultItem,
  name: '',
  description: '',
  level: 'Beginner',
};
