import { z } from 'zod';
import { FilterKeys } from '@/types';
import { profileSchema } from '@/schema/resume/sections/profile';

export const sectionSchema = z.object({
  name: z.string(),
  visible: z.boolean().default(true),
});

export const sectionsSchema = z.object({
  // Todo: a lot of to add
  profiles: sectionSchema.extend({
    id: z.literal('profiles'),
    items: z.array(profileSchema),
  }),
});

export type Section = z.infer<typeof sectionSchema>;
export type Sections = z.infer<typeof sectionsSchema>;

export type SectionWithItem<T = unknown> = Sections[FilterKeys<
  Sections,
  { items: T[] }
>];
export type SectionItem = SectionWithItem['items'][number];
export type SectionKey = 'basics' | keyof Sections;

// Defaults
export const defaultSection: Section = {
  name: '',
  visible: true,
};

export const defaultSections: Sections = {
  profiles: { ...defaultSection, id: 'profiles', name: 'Profiles', items: [] },
};

export * from './profile';