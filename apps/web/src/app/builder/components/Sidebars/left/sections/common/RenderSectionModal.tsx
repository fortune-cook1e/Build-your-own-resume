import Education from '@/app/builder/components/Sidebars/left/sections/Modals/Education';
import Experience from '@/app/builder/components/Sidebars/left/sections/Modals/Experience';
import Profiles from '@/app/builder/components/Sidebars/left/sections/Modals/Profiles';
import Projects from '@/app/builder/components/Sidebars/left/sections/Modals/Projects';
import { useSectionContext } from '@/app/builder/components/Sidebars/left/sections/common/SectionContext';
import { SectionKey } from '@fe-cookie/resume-generator-shared';
import { FC } from 'react';

const RenderSectionModal: FC = () => {
  const { id } = useSectionContext();

  const getModal = (id: SectionKey) => {
    // Todo: add more modals
    switch (id) {
      case 'profiles':
        return <Profiles />;

      case 'experience':
        return <Experience />;

      case 'education':
        return <Education />;

      case 'projects':
        return <Projects />;
      default:
        return null;
    }
  };

  return getModal(id);
};

export default RenderSectionModal;
