import { mergeTailwindCss } from '@/utils/styles';
import React, { FC } from 'react';
import * as PanelPrimitive from 'react-resizable-panels';
import { DotsSixVertical } from '@phosphor-icons/react';

type PanelResizeHandleProps = React.ComponentProps<
  typeof PanelPrimitive.PanelResizeHandle
> & {
  isDragging?: boolean;
};

const PanelResizeHandler: FC<PanelResizeHandleProps> = ({
  className,
  isDragging,
  onDragging,
  ...props
}: PanelResizeHandleProps) => {
  return (
    <PanelPrimitive.PanelResizeHandle
      className={mergeTailwindCss('relative h-screen', className)}
      onDragging={onDragging}
      {...props}
    >
      <div className="flex h-full items-center justify-center">
        <div
          className={mergeTailwindCss(
            'absolute inset-y-0 left-0 z-50 w-1 rounded-lg pl-1 transition-all hover:bg-info hover:opacity-100',
            isDragging && 'bg-info opacity-100',
          )}
        />
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-[-5px] z-50 flex items-center justify-center">
        <DotsSixVertical size={14} opacity={0.75} />
      </div>
    </PanelPrimitive.PanelResizeHandle>
  );
};

export default PanelResizeHandler;
