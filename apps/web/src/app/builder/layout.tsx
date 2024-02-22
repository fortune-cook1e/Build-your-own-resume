'use client';

import LeftSidebar from '@/web/app/builder/components/Sidebars/left';
import PanelResizeHandler from '@/web/components/PanelResizeHandler';
import { FC, ReactNode } from 'react';
import { PanelGroup, Panel } from 'react-resizable-panels';

interface Props {
  children: ReactNode;
}

const layout: FC<Props> = ({ children }) => {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={30} minSize={20}>
          <LeftSidebar />
        </Panel>

        <PanelResizeHandler></PanelResizeHandler>

        <Panel minSize={30}>{children}</Panel>

        <PanelResizeHandler></PanelResizeHandler>
        <Panel defaultSize={30} minSize={20}>
          <h1>right panel</h1>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default layout;
