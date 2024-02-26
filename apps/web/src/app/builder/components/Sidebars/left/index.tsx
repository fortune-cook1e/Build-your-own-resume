'use client';
import Basics from '@/web/app/builder/components/Sidebars/left/sections/Basics';
import ProfileForm from '@/web/app/builder/components/Sidebars/left/sections/Modals/Profiles';
import SectionBase from '@/web/app/builder/components/Sidebars/left/sections/common/SectionBase';
import { Profile } from '@/web/types/entity/resume/sections/profile';
import { Divider } from '@chakra-ui/react';
import { FC, useRef } from 'react';

const LeftSidebar: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-white">
      <div className="h-screen pb-16">
        <div className="grid gap-y-6 p-6">
          <Basics />

          <Divider />

          <SectionBase<Profile>
            id="profiles"
            title={(item) => item.network}
          ></SectionBase>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
