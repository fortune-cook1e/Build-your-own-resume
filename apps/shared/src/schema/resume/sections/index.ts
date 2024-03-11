import { z } from 'zod';
import { FilterKeys } from '../../../types';
import { profileSchema } from './profile';
import { experienceSchema } from '@/schema/resume/sections/experience';
import { educationSchema } from '@/schema/resume/sections/education';

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

  experience: sectionSchema.extend({
    id: z.literal('experience'),
    items: z.array(experienceSchema),
  }),

  education: sectionSchema.extend({
    id: z.literal('education'),
    items: z.array(educationSchema),
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
  experience: {
    ...defaultSection,
    id: 'experience',
    name: 'Experience',
    items: [],
  },
  education: {
    ...defaultSection,
    id: 'education',
    name: 'Education',
    items: [],
  },
};

export * from './profile';
export * from './experience';
export * from './education';
