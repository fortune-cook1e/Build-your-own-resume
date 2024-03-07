import { defaultItem } from '../common/item';
import { z } from 'zod';
import { itemSchema } from '../common/item';
export const experienceSchema = itemSchema.extend({
  position: z.string(),
  location: z.string(),
  company: z.string(),
  start: z.date().or(z.string()),
  end: z.date().or(z.string()),
  summary: z.string(),
});

export type Experience = z.infer<typeof experienceSchema>;

export const defaultExperience: Experience = {
  ...defaultItem,
  position: '',
  location: '',
  company: '',
  start: new Date(),
  end: new Date(),
  summary: '',
};
