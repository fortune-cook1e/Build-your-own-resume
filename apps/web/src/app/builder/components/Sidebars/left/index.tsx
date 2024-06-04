import Basics from '@/app/builder/components/Sidebars/left/sections/Basics';
import SectionBase from '@/app/builder/components/Sidebars/left/sections/common/SectionBase';
import SectionIcon from '@/app/builder/components/Sidebars/left/sections/common/SectionIcon';
import { Button, Divider, IconButton } from '@chakra-ui/react';
import { House, Plus } from '@phosphor-icons/react';
import { FC, useRef, Fragment } from 'react';
import {
  Awards,
  Certifications,
  Custom,
  Education,
  Experience,
  Interests,
  Languages,
  Profile,
  Projects,
  Skills,
} from 'shared';
import Link from 'next/link';
import Summary from '@/app/builder/components/Sidebars/left/sections/Summary';
import { useResumeStore } from '@/store/resume';

const LeftSidebar: FC = () => {
  const customs = useResumeStore((state) => state.resume.data.sections.customs);
  const addCustomSection = useResumeStore((state) => state.addCustomSection);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollIntoView = (selector: string) => {
    const section = containerRef.current?.querySelector(selector);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="flex">
      <div className="flex flex-col justify-between items-center basis-12 bg-secondary-accent/30 py-4 px-2 sm:flex">
        <IconButton
          aria-label="home button"
          variant="ghost"
          size="14"
          icon={
            <Link href="/dashboard/resumes" prefetch>
              <IconButton isRound icon={<House />} aria-label="home" />
            </Link>
          }
        />
        {/* 
        <div className="flex flex-1 flex-col justify-center gap-2">
          <SectionIcon id="basics" onClick={() => scrollIntoView('#basics')} />
          <SectionIcon
            id="profiles"
            onClick={() => scrollIntoView('#profiles')}
          />
        </div> */}
      </div>
      <div className="h-screen pb-16 overflow-scroll">
        <div ref={containerRef} className="grid gap-y-6 p-6">
          <Basics />

          <Divider />

          <Summary />

          <Divider />

          <SectionBase<Profile>
            id="profiles"
            title={(item) => item.network}
            description={(item) => item.username}
          />

          <Divider />

          <SectionBase<Experience>
            id="experience"
            title={(item) => item.position}
            description={(item) => item.company}
          />

          <SectionBase<Education>
            id="education"
            title={(item) => item.college}
            description={(item) => item.major}
          />

          <Divider />

          <SectionBase<Projects>
            id="projects"
            title={(item) => item.name}
            description={(item) => item.description}
          />

          <Divider />

          <SectionBase<Interests>
            id="interests"
            title={(item) => item.name}
            description={(item) => item.keywords.join(',')}
          />

          <Divider />

          <SectionBase<Skills>
            id="skills"
            title={(item) => item.name}
            description={(item) => item.keywords.join(',')}
          />

          <Divider />

          <SectionBase<Languages>
            id="languages"
            title={(item) => item.name}
            description={(item) => item.description}
          />

          <Divider />

          <SectionBase<Awards>
            id="awards"
            title={(item) => item.title}
            description={(item) => item.awarder}
          />

          <Divider />

          <SectionBase<Certifications>
            id="certifications"
            title={(item) => item.name}
            description={(item) => item.issuer}
          />

          {Object.values(customs).map((item) => (
            <Fragment key={item.id}>
              <Divider />
              <SectionBase<Custom>
                id={`customs.${item.id}`}
                title={(item) => item.name}
                description={(item) => item.description}
              />
            </Fragment>
          ))}

          <Divider />
          <div className="flex justify-end relative z-0">
            <Button onClick={addCustomSection} leftIcon={<Plus />}>
              Add custom field
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
