import Education from '@/templates/Ezreal/Education';
import Experience from '@/templates/Ezreal/Experience';
import Header from '@/templates/Ezreal/Header';
import Projects from '@/templates/Ezreal/Projects';
import { SectionKey, TemplateProps } from '@fe-cookie/resume-generator-shared';
import { Fragment } from 'react';

const mapStrToComponent = (str: SectionKey) => {
  switch (str) {
    case 'education':
      return <Education />;
    case 'profiles':
      return null;
    case 'experience':
      return <Experience />;
    case 'projects':
      return <Projects />;
    default:
      return null;
  }
};

const Ezreal = ({ layout }: TemplateProps) => {
  const { main, ignore } = layout;

  return (
    <div className="p-custom space-y-4">
      <Header />
      {main.map((item) => (
        <Fragment key={item}>{mapStrToComponent(item)}</Fragment>
      ))}
    </div>
  );
};

export default Ezreal;
