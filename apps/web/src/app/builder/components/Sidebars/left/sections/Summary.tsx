import { getSectionIcon } from '@/app/builder/components/Sidebars/left/sections/common/SectionIcon';
import SectionOptions from '@/app/builder/components/Sidebars/left/sections/common/SectionOptions';
import RickEditor from '@/components/RichEditor';
import { useResumeStore } from '@/store/resume';
import { get } from 'lodash-es';

const Summary = () => {
  const setValue = useResumeStore((state) => state.setValue);

  const onContentChange = (value: string) => {
    setValue('sections.summary.content', value);
  };
  const summary = useResumeStore((state) =>
    get(state.resume.data.sections, 'summary'),
  );

  return (
    <section id="summary" className="animate-fade-right animate-once">
      <header className="flex-center mb-5 flex justify-between">
        <div className="flex items-center gap-x-4">
          {getSectionIcon('summary')}
          <h2 className="line-clamp-1 text-3xl font-bold">{summary.name}</h2>
        </div>

        <div className="flex items-center">
          <SectionOptions id="summary" />
        </div>
      </header>

      <main>
        <RickEditor onChange={onContentChange} content={summary.content} />
      </main>
    </section>
  );
};

export default Summary;
