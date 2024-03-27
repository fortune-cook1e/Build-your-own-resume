import { RightPanelSectionKey } from '@/types/rightPanel';
import { Article, Palette } from '@phosphor-icons/react';

const SectionIcon = ({ id, ...rest }: { id: RightPanelSectionKey }) => {
  switch (id) {
    case 'page':
      return <Article size={20} {...rest} />;
    case 'theme':
      return <Palette size={25} {...rest} />;
      return;
    default:
      return null;
  }
};

export default SectionIcon;
