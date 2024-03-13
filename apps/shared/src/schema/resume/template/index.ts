import { SectionKey } from '@/schema/resume/sections';

export interface TemplateLayout {
  main: SectionKey[];
  ignore: SectionKey[];
}

export interface TemplateProps {
  layout: TemplateLayout;
}

// Todo: add more templates
export const templateList = ['Ezreal'];

export type Template = (typeof templateList)[number];
