import { useBoardStore } from '@/store/board';
import Section from '@/templates/Ezreal/Section';
import { FC } from 'react';
import { Custom as CustomType } from 'shared';

interface CustomProps {
  id: string;
}

const Custom: FC<CustomProps> = ({ id }) => {
  const data = useBoardStore((state) => state.resume.sections.customs[id]);

  if (!data || !data.visible) return null;

  return (
    <Section<CustomType>
      data={data}
      urlKey="website"
      summaryKey="summary"
      keywordsKey="keywords"
    >
      {(item) => (
        <div className="flex items-start justify-between">
          <div className="text-left">
            <div className="font-bold">{item.name}</div>
            <div>{item.description}</div>
          </div>

          <div className="shrink-0 text-right">
            <div className="font-bold">{item.date}</div>
            <div>{item.location}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

export default Custom;
