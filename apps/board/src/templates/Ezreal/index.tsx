import Education from '@/templates/Ezreal/Education';
import Experience from '@/templates/Ezreal/Experience';
import Header from '@/templates/Ezreal/Header';
import Interests from '@/templates/Ezreal/Interests';
import Projects from '@/templates/Ezreal/Projects';
import { SectionKey, TemplateProps } from 'shared';
import { Fragment } from 'react';
import Skills from '@/templates/Ezreal/Skills';
import Languages from '@/templates/Ezreal/Languages';
import Awards from '@/templates/Ezreal/Awards';
import Certifications from '@/templates/Ezreal/Certifications';

const mapStrToComponent = (str: SectionKey) => {
  switch (str) {
    case 'education':
      return <Education />;
    case 'profiles': // displayed in Header component
      return null;
    case 'experience':
      return <Experience />;
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

const Ezreal = ({ layout }: TemplateProps) => {
  const { main, side } = layout;

  return (
    <div className="p-custom space-y-4">
      <Header />
      {main.map((item) => (
        <Fragment key={item}>{mapStrToComponent(item as SectionKey)}</Fragment>
      ))}
      {side.map((item) => (
        <Fragment key={item}>{mapStrToComponent(item as SectionKey)}</Fragment>
      ))}
    </div>
  );
};

export default Ezreal;
