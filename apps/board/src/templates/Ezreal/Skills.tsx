import { useBoardStore } from '@/store/board';
import Section from '@/templates/Ezreal/Section';
import { Skills as SkillsType } from 'shared';

const Skills = () => {
  const data = useBoardStore((state) => state.resume.sections.skills);

  return (
    <Section<SkillsType> data={data} className="space-y-0.5">
      {(item) => (
        <div>
          <div className="font-bold">{item.name}</div>
          <p className="text-sm">{item.level}</p>
          <p className="text-sm">{item.keywords.join(',')}</p>
        </div>
      )}
    </Section>
  );
};

export default Skills;
