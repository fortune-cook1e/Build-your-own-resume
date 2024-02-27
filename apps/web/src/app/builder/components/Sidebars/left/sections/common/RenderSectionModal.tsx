import Profiles from '@/web/app/builder/components/Sidebars/left/sections/Modals/Profiles';
import { useSectionContext } from '@/web/app/builder/components/Sidebars/left/sections/common/SectionContext';
import { SectionKey } from '@/web/types/entity/resume/sections';
import { FC } from 'react';

const RenderSectionModal: FC = () => {
  const { id } = useSectionContext();

  const getModal = (id: SectionKey) => {
    // Todo: add more modals
    switch (id) {
      case 'profiles':
        return <Profiles />;
      default:
        return null;
    }
  };

  return getModal(id);
};

export default RenderSectionModal;
