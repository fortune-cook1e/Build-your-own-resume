import { z } from 'zod';

// layout
export const layoutSchema = z.object({
  main: z.array(z.string()),
  ignore: z.array(z.string()),
});
export type Layout = z.infer<typeof layoutSchema>;
export const defaultLayout: Layout = {
  main: ['summary', 'experience', 'education', 'projects', 'interests'],
  ignore: ['profiles', 'languages'],
};

// theme
export const themeSchema = z.object({
  primaryColor: z.string().default('#1890ff'),
});
export type Theme = z.infer<typeof themeSchema>;
export const defaultTheme: Theme = {
  primaryColor: '#1890ff',
};

// page
export const pageSchema = z.object({
  spacing: z.number().default(10),
  lineHeight: z.number().default(1.6),
});
export type Page = z.infer<typeof pageSchema>;
export const defaultPage: Page = {
  spacing: 26,
  lineHeight: 6,
};

export const metadataSchema = z.object({
  layout: layoutSchema,
  template: z.string().default('Ezreal'),
  theme: themeSchema,
  page: pageSchema,
});

export type Metadata = z.infer<typeof metadataSchema>;

export const defaultMetadata: Metadata = {
  layout: defaultLayout,
  template: 'Ezreal',
  theme: defaultTheme,
  page: defaultPage,
};
