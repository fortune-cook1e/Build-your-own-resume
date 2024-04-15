import { useBoardStore } from '@/store/board';
import Section from '@/templates/Ezreal/Section';
import { Experience as ExperienceProps } from 'shared';

const Experience = () => {
  const data = useBoardStore((state) => state.resume?.sections.experience);

  if (!data) {
    console.log('Experience no data');
    return null;
  }

  return (
    <Section<ExperienceProps> data={data} summaryKey="summary">
      {(item) => (
        <div className="flex items-start justify-between">
          <div className="text-left">
            <div className="font-bold">{item.company}</div>
            <div>{item.position}</div>
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

export default Experience;
