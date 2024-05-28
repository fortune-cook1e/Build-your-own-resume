'use client';

import { useResume } from '@/apis/resume/resume';
import BuilderHeadBar from '@/app/builder/components/BuilderHeadBar';
import BuilderToolBar from '@/app/builder/components/BuilderToolBar';
import LeftSidebar from '@/app/builder/components/Sidebars/left';
import RightSidebar from '@/app/builder/components/Sidebars/right';
import PanelResizeHandler from '@/components/PanelResizeHandler';
import { useBuilderStore } from '@/store/builder';
import { useParams, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { PanelGroup, Panel } from 'react-resizable-panels';
import { mergeTailwindCss } from 'shared';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const left = useBuilderStore((state) => state.panel.left);
  const right = useBuilderStore((state) => state.panel.right);
  const fullScreen = useBuilderStore((state) => state.fullScreen);
  const params = useParams<{ id: string }>();
  const { resume, loading } = useResume(params.id);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !resume) {
      router.push('/dashboard/resumes');
    }
  }, [resume, loading, router]);

  if (!resume) return null;

  return (
    <div className="relative h-full w-full overflow-hidden">
      <PanelGroup direction="horizontal">
        <Panel
          defaultSize={30}
          minSize={30}
          maxSize={40}
          onResize={left.setSize}
          className={mergeTailwindCss(
            'z-[1] bg-background',
            fullScreen ? 'hidden' : 'visible',
          )}
        >
          <LeftSidebar />
        </Panel>

        <PanelResizeHandler
          onDragging={left.handler.setDragging}
          isDragging={left.handler.isDragging}
        />

        <Panel minSize={20}>
          {!fullScreen && <BuilderHeadBar />}
          <div className="absolute inset-0 z-0">{children}</div>
          <BuilderToolBar />
        </Panel>

        <PanelResizeHandler
          onDragging={right.handler.setDragging}
          isDragging={right.handler.isDragging}
        />

        <Panel
          defaultSize={30}
          minSize={30}
          maxSize={40}
          onResize={right.setSize}
          className={mergeTailwindCss(
            'z-[1] bg-background',
            fullScreen ? 'hidden' : 'visible',
          )}
        >
          <RightSidebar />
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default Layout;
