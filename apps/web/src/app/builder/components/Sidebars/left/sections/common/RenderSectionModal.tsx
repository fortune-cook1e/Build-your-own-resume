import Education from '@/app/builder/components/Sidebars/left/sections/Modals/Education';
import Experience from '@/app/builder/components/Sidebars/left/sections/Modals/Experience';
import Interests from '@/app/builder/components/Sidebars/left/sections/Modals/Interests';
import Profiles from '@/app/builder/components/Sidebars/left/sections/Modals/Profiles';
import Projects from '@/app/builder/components/Sidebars/left/sections/Modals/Projects';
import { useSectionContext } from '@/app/builder/components/Sidebars/left/sections/common/SectionContext';
import { SectionKey } from 'shared';
import { FC } from 'react';
import Skills from '@/app/builder/components/Sidebars/left/sections/Modals/Skills';
import Languages from '@/app/builder/components/Sidebars/left/sections/Modals/Languages';
import Awards from '@/app/builder/components/Sidebars/left/sections/Modals/Awards';
import Certifications from '@/app/builder/components/Sidebars/left/sections/Modals/Certifications';

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

      case 'interests':
        return <Interests />;

      case 'skills':
        return <Skills />;

      case 'languages':
        return <Languages />;

      case 'awards':
        return <Awards />;

      case 'certifications':
        return <Certifications />;
      default:
        return null;
    }
  };

  return getModal(id);
};

export default RenderSectionModal;
