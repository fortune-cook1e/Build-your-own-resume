import { defaultItem } from './../common/item';
import { itemSchema } from '@/schema/resume/common';
import { z } from 'zod';

export const educationSchema = itemSchema.extend({
  college: z.string(),
  major: z.string(),
  area: z.string(),
  start: z.date().or(z.string()),
  end: z.date().or(z.string()),
  summary: z.string(),
});
export type Education = z.infer<typeof educationSchema>;

export const defaultEducation: Education = {
  ...defaultItem,
  college: '',
  major: '',
  area: '',
  start: new Date(),
  end: new Date(),
  summary: '',
};
