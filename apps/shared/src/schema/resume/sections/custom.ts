import { defaultItem } from '../common/item';
import { defaultUrl, itemSchema, urlSchema } from '@/schema/resume/common';

import { z } from 'zod';

export const customSchema = itemSchema.extend({
  name: z.string(),
  description: z.string(),
  date: z.string(),
  location: z.string(),
  website: urlSchema,
  summary: z.string(),
  keywords: z.array(z.string()).default([]),
});

export type Custom = z.infer<typeof customSchema>;

export const defaultCustom: Custom = {
  ...defaultItem,
  name: '',
  description: '',
  date: '',
  location: '',
  website: defaultUrl,
  summary: '',
  keywords: [],
};
