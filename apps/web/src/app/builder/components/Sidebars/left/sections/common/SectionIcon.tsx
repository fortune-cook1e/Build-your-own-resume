import { SectionKey } from '@/web/types/entity/resume/sections';
import { IconProps, ShareNetwork } from '@phosphor-icons/react';
import { User } from '@phosphor-icons/react';

export const getSectionIcon = (id: SectionKey, props?: IconProps) => {
  switch (id) {
    case 'basics':
      return <User size={18} {...props} />;
    // Todo: add more icons
    case 'profiles':
      return <ShareNetwork size={18} {...props} />;
    default:
      return null;
  }
};
