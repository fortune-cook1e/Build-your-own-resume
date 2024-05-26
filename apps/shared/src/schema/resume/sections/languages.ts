import { defaultItem } from './../common/item';
import { itemSchema } from '@/schema/resume/common';
import { z } from 'zod';

export const languagesSchema = itemSchema.extend({
  name: z.string(),
  description: z.string(),
});

export type Languages = z.infer<typeof languagesSchema>;

export const defaultLanguages: Languages = {
  ...defaultItem,
  name: '',
  description: '',
};
