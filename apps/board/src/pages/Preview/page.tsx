import Page from '@/components/Page';
import { useBoardStore } from '@/store/board';
import { getTemplate } from '@/templates';
import { useMemo } from 'react';
import { TemplateLayout } from 'shared';

const Preview = () => {
  const layout = useBoardStore((state) => state.resume.metadata.layout);
  const template = useBoardStore((state) => state.resume.metadata.template);

  const Template = useMemo(() => getTemplate(template), [template]);

  return (
    <Page>
      <Template layout={layout as TemplateLayout} />
    </Page>
  );
};

export default Preview;
