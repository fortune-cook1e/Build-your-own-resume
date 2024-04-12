import { useBoardStore } from '@/store/board';
import Section from '@/templates/Ezreal/Section';
import { Interests as InterestsType } from '@fe-cookie/resume-generator-shared';

const Interests = () => {
  const data = useBoardStore((state) => state.resume.sections.interests);

  return (
    <Section<InterestsType> data={data} className="space-y-0.5">
      {(item) => (
        <div>
          <div className="font-bold">{item.name}</div>
          <p className="text-sm">{item.description}</p>
        </div>
      )}
    </Section>
  );
};

export default Interests;
