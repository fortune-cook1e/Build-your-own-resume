import Basics from '@/app/builder/components/Sidebars/left/sections/Basics';
import SectionBase from '@/app/builder/components/Sidebars/left/sections/common/SectionBase';
import SectionIcon from '@/app/builder/components/Sidebars/left/sections/common/SectionIcon';
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
import { Separator, Button } from 'ui';

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
      <div className="flex basis-12 flex-col items-center justify-between bg-secondary-accent/30 px-2 py-4 sm:flex">
        <Button
          size="icon"
          aria-label="home button"
          variant="ghost"
          className="rounded-full"
        >
          <Link href="/dashboard/resumes" prefetch>
            <House />
          </Link>
        </Button>
        {/* 
        <div className="flex flex-1 flex-col justify-center gap-2">
          <SectionIcon id="basics" onClick={() => scrollIntoView('#basics')} />
          <SectionIcon
            id="profiles"
            onClick={() => scrollIntoView('#profiles')}
          />
        </div> */}
      </div>
      <div className="h-screen overflow-scroll pb-16">
        <div ref={containerRef} className="grid gap-y-6 p-6">
          <Basics />

          <Separator />

          <Summary />

          <Separator />

          <SectionBase<Profile>
            id="profiles"
            title={(item) => item.network}
            description={(item) => item.username}
          />

          <Separator />

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

          <Separator />

          <SectionBase<Projects>
            id="projects"
            title={(item) => item.name}
            description={(item) => item.description}
          />

          <Separator />

          <SectionBase<Interests>
            id="interests"
            title={(item) => item.name}
            description={(item) => item.keywords.join(',')}
          />

          <Separator />

          <SectionBase<Skills>
            id="skills"
            title={(item) => item.name}
            description={(item) => item.keywords.join(',')}
          />

          <Separator />

          <SectionBase<Languages>
            id="languages"
            title={(item) => item.name}
            description={(item) => item.description}
          />

          <Separator />

          <SectionBase<Awards>
            id="awards"
            title={(item) => item.title}
            description={(item) => item.awarder}
          />

          <Separator />

          <SectionBase<Certifications>
            id="certifications"
            title={(item) => item.name}
            description={(item) => item.issuer}
          />

          {Object.values(customs).map((item) => (
            <Fragment key={item.id}>
              <Separator />
              <SectionBase<Custom>
                id={`customs.${item.id}`}
                title={(item) => item.name}
                description={(item) => item.description}
              />
            </Fragment>
          ))}

          <Separator />
          <div className="relative z-0 flex justify-end">
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
