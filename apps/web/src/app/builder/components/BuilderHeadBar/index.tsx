import { useBuilderStore } from '@/store/builder';
import { useResumeStore } from '@/store/resume';
import { IconButton } from '@chakra-ui/react';
import { HouseSimple, SidebarSimple } from '@phosphor-icons/react';
import Link from 'next/link';
import { FC } from 'react';

const BuilderHeadBar: FC = () => {
  const leftPanelSize = useBuilderStore((state) => state.panel.left.size);
  const rightPanelSize = useBuilderStore((state) => state.panel.right.size);
  const title = useResumeStore((state) => state.resume.title);

  return (
    <div
      style={{ left: `${leftPanelSize}%`, right: `${rightPanelSize}%` }}
      className="fixed inset-x-0 top-0 z-[60] h-16 bg-secondary-accent/50"
    >
      <div className="flex items-center justify-between px-4 h-full">
        <div className="lg:hidden">
          <IconButton
            aria-label="Toggle left"
            variant="ghost"
            icon={<SidebarSimple />}
          ></IconButton>
        </div>

        <div className="flex items-center justify-center gap-x-1 lg:mx-auto">
          <IconButton
            aria-label="Home"
            variant="ghost"
            icon={
              <Link href="/resumes">
                <HouseSimple />
              </Link>
            }
          />
          <span className="mr-2 text-xs opacity-40">/</span>

          <h1 className="font-medium">{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default BuilderHeadBar;
