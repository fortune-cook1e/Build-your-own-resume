import Page from '@/components/Page';
import { useBoardStore } from '@/store/board';
import { getTemplate } from '@/templates';
import { POST_MESSAGES } from 'shared';
import { useEffect, useMemo, useRef } from 'react';
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchContentRef,
} from 'react-zoom-pan-pinch';
import { MM_TO_PX, PAGE_SIZE_MAP } from '@/constants';

const Builder = () => {
  const template = useBoardStore((state) => state.resume.metadata.template);
  const layout = useBoardStore((state) => state.resume.metadata.layout);

  const transformRef = useRef<ReactZoomPanPinchContentRef>(null);

  const handleMessage = (event: MessageEvent) => {
    if (event.origin !== window.location.origin) return;
    const { type } = event.data;
    if (type === POST_MESSAGES.zoomIn) transformRef.current?.zoomIn();
    if (type === POST_MESSAGES.zoomOut) transformRef.current?.zoomOut();
    if (type === POST_MESSAGES.centerView) transformRef.current?.centerView();
    if (type === POST_MESSAGES.resetView) {
      transformRef.current?.resetTransform(0);
      setTimeout(() => transformRef.current?.centerView(0.8, 0), 10);
    }
  };

  const RenderTemplate = useMemo(() => {
    return getTemplate(template);
  }, [template]);

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [transformRef]);

  return (
    <TransformWrapper
      centerOnInit
      maxScale={2}
      minScale={0.4}
      initialScale={0.8}
      ref={transformRef}
      limitToBounds={false}
    >
      <TransformComponent
        wrapperClass="!w-screen !h-screen"
        contentClass="grid items-start justify-center space-x-12 pointer-events-none"
        contentStyle={{ width: `${PAGE_SIZE_MAP.a4.width * MM_TO_PX + 42}px` }}
      >
        <Page mode="builder">
          <RenderTemplate layout={layout} />
        </Page>
      </TransformComponent>
    </TransformWrapper>
  );
};

export default Builder;
