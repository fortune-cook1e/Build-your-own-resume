'use client';

import { useResume } from '@/apis/resume/resume';
import BuilderHeadBar from '@/app/builder/components/BuilderHeadBar';
import LeftSidebar from '@/app/builder/components/Sidebars/left';
import PanelResizeHandler from '@/components/PanelResizeHandler';
import { useBuilderStore } from '@/store/builder';
import { useParams } from 'next/navigation';
import { FC, ReactNode } from 'react';
import { PanelGroup, Panel } from 'react-resizable-panels';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const { left, right } = useBuilderStore((state) => state.panel);
  const params = useParams<{ id: string }>();
  const { resume } = useResume(params.id);

  if (!resume) return null;

  return (
    <div className="relative h-full w-full overflow-hidden">
      <PanelGroup direction="horizontal">
        <Panel
          defaultSize={30}
          minSize={30}
          onResize={left.setSize}
          className="z-20 bg-background"
        >
          <LeftSidebar />
        </Panel>

        <PanelResizeHandler
          onDragging={left.handler.setDragging}
          isDragging={left.handler.isDragging}
        />

        <Panel minSize={30}>
          <>
            <BuilderHeadBar />
            <div className="absolute inset-0 z-10">{children}</div>
          </>
        </Panel>

        <PanelResizeHandler
          onDragging={right.handler.setDragging}
          isDragging={right.handler.isDragging}
        />
        <Panel
          defaultSize={30}
          minSize={15}
          onResize={right.setSize}
          className="z-20 bg-background"
        >
          <h1>right panel</h1>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default Layout;
