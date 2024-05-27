import { useBoardStore } from '@/store/board';
import Section from '@/templates/Ezreal/Section';
import { Awards as AwardsProps } from 'shared';

const Awards = () => {
  const data = useBoardStore((state) => state.resume.sections.awards);
  if (!data || !data.visible) return null;

  return (
    <Section<AwardsProps> data={data} urlKey="website" summaryKey="summary">
      {(item) => (
        <div className="flex items-start justify-between">
          <div className="text-left">
            <div className="font-bold">{item.title}</div>
            <div>{item.awarder}</div>
          </div>

          <div className="shrink-0 text-right">
            <div className="font-bold">{item.date}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

export default Awards;
