import { MM_TO_PX, PAGE_SIZE_MAP } from '@/constants';
import { useBoardStore } from '@/store/board';
import { FC, ReactNode } from 'react';
import { cn } from 'ui';
interface Props {
  mode?: 'builder' | 'preview';
  children: ReactNode;
}

const Page: FC<Props> = ({ mode = 'preview', children }) => {
  const font = useBoardStore((state) => state.resume.metadata.page.font);

  return (
    <div
      id="page"
      style={{
        fontFamily: font.family,
      }}
      className={cn(
        'text-text relative bg-background bg-white',
        mode === 'builder' && 'shadow-2xl',
      )}
    >
      {children}

      {mode === 'builder' && (
        <div
          className="absolute inset-x-0 border-b border-dashed"
          style={{
            top: `${PAGE_SIZE_MAP.a4.height * MM_TO_PX}px`,
          }}
        />
      )}
    </div>
  );
};

export default Page;
