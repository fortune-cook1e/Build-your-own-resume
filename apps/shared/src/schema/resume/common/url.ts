import { z } from 'nestjs-zod/z';

// Schema
export const urlSchema = z.object({
  label: z.string(),
  link: z.literal('').or(z.string().url()),
});

// Type
export type URL = z.infer<typeof urlSchema>;

// Defaults
export const defaultUrl: URL = {
  label: '',
  link: '',
};
