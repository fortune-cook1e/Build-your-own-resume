'use client';

import LeftSidebar from '@/app/builder/components/Sidebars/left';
import PanelResizeHandler from '@/components/PanelResizeHandler';
import { useBuilderStore } from '@/store/builder';
import { FC, ReactNode } from 'react';
import { PanelGroup, Panel } from 'react-resizable-panels';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const { left, right } = useBuilderStore((state) => state.panel);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={30} minSize={30} onResize={left.setSize}>
          <LeftSidebar />
        </Panel>

        <PanelResizeHandler
          onDragging={left.handler.setDragging}
          isDragging={left.handler.isDragging}
        ></PanelResizeHandler>

        <Panel minSize={30}>{children}</Panel>

        <PanelResizeHandler
          onDragging={right.handler.setDragging}
          isDragging={right.handler.isDragging}
        ></PanelResizeHandler>
        <Panel defaultSize={30} minSize={25} onResize={right.setSize}>
          <h1>right panel</h1>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default Layout;
