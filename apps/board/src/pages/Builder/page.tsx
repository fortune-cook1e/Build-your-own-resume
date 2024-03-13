import { useBoardStore } from '@/store/board';
import { getTemplate } from '@/templates';
import { TemplateLayout } from '@fe-cookie/resume-generator-shared';
import { useMemo } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const Builder = () => {
  const resume = useBoardStore((state) => state.resume);
  const template = useBoardStore((state) => state.resume.metadata.template);
  const layout = useBoardStore((state) => state.resume.metadata.layout);

  const RenderTemplate = useMemo(() => {
    return getTemplate(template);
  }, [template]);

  return (
    <TransformWrapper>
      <TransformComponent wrapperClass="!w-screen !h-screen">
        <RenderTemplate layout={layout as TemplateLayout} />
      </TransformComponent>
    </TransformWrapper>
  );
};

export default Builder;
