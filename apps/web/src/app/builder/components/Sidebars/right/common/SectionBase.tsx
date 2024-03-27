import SectionIcon from '@/app/builder/components/Sidebars/right/common/SectionIcon';
import { RightPanelSectionKey } from '@/types/rightPanel';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  id: RightPanelSectionKey;
}

const SectionBase: FC<Props> = ({ children, id }) => {
  return (
    <div className="animate-fade-left animate-once">
      <header className="flex items-center gap-x-4 mb-4">
        <SectionIcon id={id} />
        <h1 className="text-3xl font-bold">
          {id.slice(0, 1).toUpperCase() + id.slice(1)}
        </h1>
      </header>

      <div>{children}</div>
    </div>
  );
};

export default SectionBase;
