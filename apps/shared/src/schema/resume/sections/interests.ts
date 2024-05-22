import { defaultItem } from './../common/item';
import { itemSchema } from '@/schema/resume/common';
import { z } from 'zod';

export const interestsSchema = itemSchema.extend({
  name: z.string(),
  keywords: z.array(z.string()),
});

export type Interests = z.infer<typeof interestsSchema>;
export const defaultInterests: Interests = {
  ...defaultItem,
  name: '',
  keywords: [],
};
