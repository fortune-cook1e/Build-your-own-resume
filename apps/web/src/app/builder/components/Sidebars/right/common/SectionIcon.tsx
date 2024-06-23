import { RightPanelSectionKey } from '@/types/rightPanel';
import { Article, DownloadSimple, Palette, Share } from '@phosphor-icons/react';

const SectionIcon = ({ id, ...rest }: { id: RightPanelSectionKey }) => {
  switch (id) {
    case 'page':
      return <Article size={20} {...rest} />;
    case 'theme':
      return <Palette size={20} {...rest} />;
    case 'export':
      return <DownloadSimple size={20} {...rest} />;
    case 'share':
      return <Share size={20} {...rest} />;
    default:
      return null;
  }
};

export default SectionIcon;
