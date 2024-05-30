import { useBoardStore } from '@/store/board';
import Section from '@/templates/Ezreal/Section';
import { Skills as SkillsType } from 'shared';

const Skills = () => {
  const data = useBoardStore((state) => state.resume.sections.skills);

  if (!data || !data.visible) {
    return null;
  }

  return (
    <Section<SkillsType>
      data={data}
      className="space-y-0.5"
      keywordsKey="keywords"
    >
      {(item) => (
        <div>
          <div className="font-bold">{item.name}</div>
          <p className="text-sm">{item.level}</p>
        </div>
      )}
    </Section>
  );
};

export default Skills;
