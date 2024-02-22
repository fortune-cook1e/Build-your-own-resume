import { SectionKey } from '@/web/types/entity/resume/sections';
import { IconProps } from '@phosphor-icons/react';
import { User } from '@phosphor-icons/react';

export const getSectionIcon = (id: SectionKey, props?: IconProps) => {
  switch (id) {
    case 'basics':
      return <User size={18} {...props} />;
    // Todo: add more icons
    default:
      return null;
  }
};
