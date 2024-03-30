import { z } from 'zod';
import { FilterKeys } from '../../../types';
import { profileSchema } from './profile';
import { experienceSchema } from '@/schema/resume/sections/experience';
import { educationSchema } from '@/schema/resume/sections/education';
import { projectsSchema } from '@/schema/resume/sections/projects';
import { interestsSchema } from '@/schema/resume/sections/interests';

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

  summary: sectionSchema.extend({
    id: z.literal('summary'),
    content: z.string().default(''),
  }),

  projects: sectionSchema.extend({
    id: z.literal('projects'),
    items: z.array(projectsSchema),
  }),

  interests: sectionSchema.extend({
    id: z.literal('interests'),
    items: z.array(interestsSchema),
  }),
});

export type Section = z.infer<typeof sectionSchema>;
export type Sections = z.infer<typeof sectionsSchema>;

export type SectionWithItem<T = unknown> = Sections[FilterKeys<
  Sections,
  { items: T[] }
>];
export type SectionItem = SectionWithItem['items'][number];
export type SectionKey = 'basics' | 'summary' | keyof Sections;

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
  summary: {
    ...defaultSection,
    id: 'summary',
    name: 'Summary',
    content: '',
  },
  projects: {
    ...defaultSection,
    id: 'projects',
    name: 'Projects',
    items: [],
  },
  interests: {
    ...defaultSection,
    id: 'interests',
    name: 'Interests',
    items: [],
  },
};

export * from './profile';
export * from './experience';
export * from './education';
export * from './basics';
export * from './projects';
export * from './interests';
