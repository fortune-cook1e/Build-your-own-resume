'use client';
import Basics from '@/app/builder/components/Sidebars/left/sections/Basics';
import SectionBase from '@/app/builder/components/Sidebars/left/sections/common/SectionBase';
import SectionIcon from '@/app/builder/components/Sidebars/left/sections/common/SectionIcon';
import { Profile } from '@/types/entity/resume/sections/profile';
import { Divider, Flex, IconButton } from '@chakra-ui/react';
import { HourglassMedium } from '@phosphor-icons/react';
import { FC, useRef } from 'react';

const LeftSidebar: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollIntoView = (selector: string) => {
    const section = containerRef.current?.querySelector(selector);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Flex>
      <Flex
        flexDir="column"
        justify="space-between"
        align="center"
        className="hidden basis-12 bg-secondary-accent/30 py-4 px-2 sm:flex"
      >
        <IconButton
          aria-label="home button"
          variant="ghost"
          size="14"
          icon={<HourglassMedium />}
        />

        <Flex flex="1" flexDir="column" justify="center" gap={2}>
          <SectionIcon id="basics" onClick={() => scrollIntoView('#basics')} />
          <SectionIcon
            id="profiles"
            onClick={() => scrollIntoView('#profiles')}
          />
        </Flex>
      </Flex>
      <div className="h-screen pb-16 overflow-scroll">
        <div ref={containerRef} className="grid gap-y-6 p-6">
          <Basics />

          <Divider />

          <SectionBase<Profile>
            id="profiles"
            title={(item) => item.network}
            description={(item) => item.username}
          ></SectionBase>

          <Divider />
        </div>
      </div>
    </Flex>
  );
};

export default LeftSidebar;
