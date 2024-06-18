import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export const TooltipProvider = TooltipPrimitive.Provider;

export const TooltipRoot = TooltipPrimitive.Root;

export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, children, sideOffset = 6, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'ui-z-50 ui-overflow-hidden ui-rounded ui-bg-primary ui-px-3 ui-py-1.5 ui-text-xs ui-text-primary-foreground ui-shadow-sm ui-animate-in ui-fade-in-0 ui-zoom-in-95 ui-data-[state=closed]:animate-out ui-data-[state=closed]:fade-out-0 ui-data-[state=closed]:zoom-out-95 ui-data-[side=bottom]:slide-in-from-top-2 ui-data-[side=left]:slide-in-from-right-2 ui-data-[side=right]:slide-in-from-left-2 ui-data-[side=top]:slide-in-from-bottom-2',
        className,
      )}
      {...props}
    >
      {children}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

type TooltipProps = React.ComponentPropsWithoutRef<typeof TooltipContent> & {
  content: React.ReactNode;
};

export const Tooltip = ({ content, children, ...props }: TooltipProps) => (
  <TooltipRoot>
    <TooltipTrigger asChild>{children}</TooltipTrigger>
    <TooltipContent {...props}>{content}</TooltipContent>
  </TooltipRoot>
);
