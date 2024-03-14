import TemplateWrapper from '@/components/TemplateWrapper';
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
    <TransformWrapper
      centerOnInit
      maxScale={2}
      minScale={0.4}
      initialScale={0.8}
      limitToBounds
    >
      <TransformComponent
        wrapperClass="!w-screen !h-screen"
        contentClass="grid items-start justify-center space-x-12 pointer-events-none"
        contentStyle={{ width: '835.8px' }}
      >
        <TemplateWrapper>
          <RenderTemplate layout={layout as TemplateLayout} />
        </TemplateWrapper>
      </TransformComponent>
    </TransformWrapper>
  );
};

export default Builder;
