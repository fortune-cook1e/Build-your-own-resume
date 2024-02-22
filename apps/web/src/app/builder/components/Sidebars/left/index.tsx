'use client';
import BasicsSection from '@/web/app/builder/components/Sidebars/left/sections/BasicsSection';
import { FC, useRef } from 'react';

const LeftSidebar: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-white">
      <div className="h-screen pb-16">
        <div className="grid gap-y-6 p-6">
          <BasicsSection />
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
