import { defaultItem } from './../common/item';
import { z } from 'zod';
import { itemSchema } from './../common/item';
import { defaultUrl, urlSchema } from '@/schema/resume/common';
export const profileSchema = itemSchema.extend({
  network: z.string().min(1),
  username: z.string().min(1),
  icon: z
    .string()
    .describe(
      'Slug for the icon from https://simpleicons.org. For example, "github", "linkedin", etc.',
    ),
  url: urlSchema,
});

export type Profile = z.infer<typeof profileSchema>;

export const defaultProfile: Profile = {
  ...defaultItem,
  id: '',
  network: '',
  username: '',
  icon: '',
  url: defaultUrl,
};
