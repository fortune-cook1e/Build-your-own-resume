import { defaultUrl, urlSchema } from '@/web/types/entity/resume/common/url';
import { z } from 'zod';

export const basicsSchema = z.object({
  name: z.string(),
  email: z.literal('').or(z.string().email()),
  phone: z.string(),
  location: z.string(),
  url: urlSchema,
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
  picture: {
    url: '',
    size: 64,
  },
};
