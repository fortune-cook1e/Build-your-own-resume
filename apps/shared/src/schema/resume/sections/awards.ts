import { defaultItem } from './../common/item';
import { itemSchema, urlSchema } from '@/schema/resume/common';
import { z } from 'zod';

export const awardsSchema = itemSchema.extend({
  title: z.string(),
  awarder: z.string(),
  date: z.string(),
  website: urlSchema,
  summary: z.string(),
});

export type Awards = z.infer<typeof awardsSchema>;
export const defaultAwards: Awards = {
  ...defaultItem,
  title: '',
  awarder: '',
  date: '',
  website: {
    label: '',
    link: '',
  },
  summary: '',
};
