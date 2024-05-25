import { useBuilderStore } from '@/store/builder';
import { Icon, IconButton, Tooltip } from '@chakra-ui/react';
import { POST_MESSAGES } from 'shared';
import {
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
  ClockClockwise,
  CornersIn,
  CornersOut,
} from '@phosphor-icons/react';
import { CubeFocus } from '@phosphor-icons/react/dist/ssr';
import { FC } from 'react';

const BuilderToolBar: FC = () => {
  const iframeRef = useBuilderStore((state) => state.iframe.ref);
  const fullScreen = useBuilderStore((state) => state.fullScreen);
  const setFullScreen = useBuilderStore((state) => state.setFullscreen);

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

  const onReset = () => {
    iframeRef?.contentWindow?.postMessage(
      { type: POST_MESSAGES.resetView },
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

        <Tooltip label="Reset">
          <IconButton
            aria-label="center"
            variant="ghost"
            icon={<ClockClockwise />}
            onClick={onReset}
          />
        </Tooltip>

        <Tooltip label={fullScreen ? 'Exit full screen' : 'Full screen'}>
          <IconButton
            aria-label={fullScreen ? 'Exit full screen' : 'Full screen'}
            variant="ghost"
            icon={fullScreen ? <CornersIn /> : <CornersOut />}
            onClick={() => setFullScreen(!fullScreen)}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default BuilderToolBar;
