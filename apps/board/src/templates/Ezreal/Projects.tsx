import { useBoardStore } from '@/store/board';
import Section from '@/templates/Ezreal/Section';
import { Projects as ProjectsType } from 'shared';
import { FC } from 'react';

const Projects: FC = () => {
  const data = useBoardStore((state) => state.resume.sections.projects);

  if (!data || !data.visible) {
    return null;
  }

  return (
    <Section<ProjectsType> data={data} urlKey="website" summaryKey="summary">
      {(item) => (
        <div className="flex items-start justify-between">
          <div className="text-left">
            <div className="font-bold">{item.name}</div>
            <div>{item.description}</div>
          </div>

          <div className="shrink-0 text-right">
            <div className="font-bold">{item.date}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

export default Projects;
