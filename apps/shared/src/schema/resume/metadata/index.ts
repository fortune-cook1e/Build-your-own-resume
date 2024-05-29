import { SectionEnum } from '@/schema/resume/sections';
import { z } from 'zod';

// layout
export const layoutSchema = z.object({
  main: z.array(SectionEnum.or(z.string())),
  side: z.array(SectionEnum.or(z.string())),
});
export type Layout = z.infer<typeof layoutSchema>;
export const defaultLayout: Layout = {
  main: [
    'summary',
    'experience',
    'education',
    'projects',
    'interests',
    'skills',
  ],
  side: ['languages', 'awards', 'certifications'],
};

// template
export const templateEnum = z.enum(['Ezreal']);
export type Template = z.infer<typeof templateEnum>;
export type TemplateProps = {
  layout: Layout;
};

// theme
export const themeSchema = z.object({
  primaryColor: z.string().default('#1890ff'),
  textColor: z.string().default('#000000'),
  backgroundColor: z.string().default('#ffffff'),
});
export type Theme = z.infer<typeof themeSchema>;
export const defaultTheme: Theme = {
  primaryColor: '#1890ff',
  textColor: '#000000',
  backgroundColor: '#ffffff',
};

// page
export const pageSchema = z.object({
  spacing: z.number().default(10),
  lineHeight: z.number().default(1.6),
});
export type Page = z.infer<typeof pageSchema>;
export const defaultPage: Page = {
  spacing: 26,
  lineHeight: 1.5,
};

export const metadataSchema = z.object({
  layout: layoutSchema,
  template: templateEnum,
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
