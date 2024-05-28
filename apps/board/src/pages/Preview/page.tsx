import Page from '@/components/Page';
import { useBoardStore } from '@/store/board';
import { getTemplate } from '@/templates';
import { useMemo } from 'react';

const Preview = () => {
  const layout = useBoardStore((state) => state.resume.metadata.layout);
  const template = useBoardStore((state) => state.resume.metadata.template);

  const Template = useMemo(() => getTemplate(template), [template]);

  return (
    <Page>
      <Template layout={layout} />
    </Page>
  );
};

export default Preview;
