import { defaultUrl, urlSchema } from '@/types/entity/resume/common/url';
import { z } from 'zod';

export const basicsSchema = z.object({
  name: z.string(),
  email: z.literal('').or(z.string().email()),
  phone: z.string(),
  location: z.string(),
  url: urlSchema,
  headline: z.string(),
  gender: z.enum(['male', 'female', 'other']).default('male'),
  picture: z.object({
    url: z.string(),
    size: z.number().default(32),
  }),
});

export type Basics = z.infer<typeof basicsSchema>;

export const defaultBasics: Basics = {
  name: '',
  email: '',
  phone: '',
  location: '',
  url: defaultUrl,
  gender: 'female',
  headline: '',
  picture: {
    url: '',
    size: 64,
  },
};
