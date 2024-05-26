import { useBoardStore } from '@/store/board';
import Section from '@/templates/Ezreal/Section';
import { Languages as LanguagesType } from 'shared';

const Languages = () => {
  const data = useBoardStore((state) => state.resume.sections.languages);
  if (!data || !data.visible) return null;

  return (
    <Section<LanguagesType> data={data}>
      {(item) => (
        <div>
          <div className="font-bold">{item.name}</div>
          <p className="text-sm">{item.description}</p>
        </div>
      )}
    </Section>
  );
};

export default Languages;
