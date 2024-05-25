import { useBoardStore } from '@/store/board';
import Section from '@/templates/Ezreal/Section';
import { Education as EducationProps } from 'shared';

const Education = () => {
  const data = useBoardStore((state) => state.resume.sections.education);

  if (!data || !data.visible) {
    return null;
  }

  return (
    <Section<EducationProps> data={data} summaryKey="summary">
      {(item) => (
        <div className="flex items-start justify-between">
          <div className="text-left">
            <div className="font-bold">{item.college}</div>
            <div>{item.area}</div>
          </div>

          <div className="shrink-0 text-right">
            <div className="font-bold">{item.date}</div>
            <div>{item.major}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

export default Education;
