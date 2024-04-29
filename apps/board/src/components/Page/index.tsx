import { MM_TO_PX, PAGE_SIZE_MAP } from '@/constants';
import { FC, ReactNode } from 'react';
import { mergeTailwindCss } from 'shared';

interface Props {
  mode?: 'builder' | 'preview';
  children: ReactNode;
}

const Page: FC<Props> = ({ mode = 'preview', children }) => {
  // Todo: handle dynamic fontfamily
  return (
    <div
      id="page"
      className={mergeTailwindCss(
        'relative bg-white',
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
        ></div>
      )}
    </div>
  );
};

export default Page;
