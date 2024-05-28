import { defaultItem } from './../common/item';
import { itemSchema, urlSchema } from '@/schema/resume/common';
import { z } from 'zod';

export const certificationsSchema = itemSchema.extend({
  name: z.string(),
  issuer: z.string(),
  date: z.string(),
  website: urlSchema,
  summary: z.string(),
});

export type Certifications = z.infer<typeof certificationsSchema>;

export const defaultCertifications: Certifications = {
  ...defaultItem,
  name: '',
  issuer: '',
  date: '',
  website: {
    label: '',
    link: '',
  },
  summary: '',
};
