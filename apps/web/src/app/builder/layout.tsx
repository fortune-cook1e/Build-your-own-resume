'use client';

import { FC, ReactNode } from 'react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';

interface Props {
  children: ReactNode;
}

const layout: FC<Props> = ({ children }) => {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={30} minSize={20}>
          left panel
        </Panel>
        <PanelResizeHandle></PanelResizeHandle>
        <Panel minSize={30}>{children}</Panel>
        <PanelResizeHandle></PanelResizeHandle>
        <Panel defaultSize={30} minSize={20}>
          <h1>right panel</h1>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default layout;
