import { z } from 'zod';

// Schema
export const urlSchema = z.object({
  label: z.string(),
  link: z.literal('').or(
    z.string().url({
      message: 'Url must start with https://',
    }),
  ),
});

// Type
export type URL = z.infer<typeof urlSchema>;

// Defaults
export const defaultUrl: URL = {
  label: '',
  link: '',
};
