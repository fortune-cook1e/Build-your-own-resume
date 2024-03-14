import { useBuilderStore } from '@/store/builder';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { POST_MESSAGES } from '@fe-cookie/resume-generator-shared';
import {
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
} from '@phosphor-icons/react';
import { CubeFocus } from '@phosphor-icons/react/dist/ssr';
import { FC } from 'react';

const BuilderToolBar: FC = () => {
  const iframeRef = useBuilderStore((state) => state.iframe.ref);

  const onZoomIn = () => {
    iframeRef?.contentWindow?.postMessage({ type: POST_MESSAGES.zoomIn }, '*');
  };
  const onZoomOut = () => {
    iframeRef?.contentWindow?.postMessage({ type: POST_MESSAGES.zoomOut }, '*');
  };
  const onCenter = () => {
    iframeRef?.contentWindow?.postMessage(
      { type: POST_MESSAGES.centerView },
      '*',
    );
  };

  return (
    <div className="fixed inset-x-0 bottom-0 mx-auto py-6 text-center">
      <div className="inline-flex items-center justify-center rounded-full bg-background px-4 shadow-xl">
        <Tooltip label="Zoom in">
          <IconButton
            aria-label="zoom in"
            variant="ghost"
            icon={<MagnifyingGlassPlus />}
            onClick={onZoomIn}
          />
        </Tooltip>

        <Tooltip label="zoom out">
          <IconButton
            variant="ghost"
            aria-label="zoom out"
            icon={<MagnifyingGlassMinus />}
            onClick={onZoomOut}
          />
        </Tooltip>

        <Tooltip label="Center">
          <IconButton
            aria-label="center"
            variant="ghost"
            icon={<CubeFocus />}
            onClick={onCenter}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default BuilderToolBar;
