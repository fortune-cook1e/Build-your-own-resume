import { z } from 'zod';

export const defaultLayout = {
  main: ['summary', 'experience', 'education', 'projects'],
  ignore: ['profiles', 'languages'],
};

export const layoutSchema = z.object({
  main: z.array(z.string()),
  ignore: z.array(z.string()),
});

export const metadataSchema = z.object({
  layout: layoutSchema,
  template: z.string().default('Ezreal'),
});

export type Metadata = z.infer<typeof metadataSchema>;

export const defaultMetadata: Metadata = {
  layout: defaultLayout,
  template: 'Ezreal',
};
