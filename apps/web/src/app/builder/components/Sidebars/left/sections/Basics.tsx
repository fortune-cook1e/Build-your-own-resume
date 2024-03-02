import { getSectionIcon } from '@/app/builder/components/Sidebars/left/sections/common/SectionIcon';
import UrlInput from '@/app/builder/components/Sidebars/left/sections/common/UrlInput';
import { useResumeStore } from '@/store/resume';
import { basicsSchema } from '@fe-cookie/resume-generator-shared';
import { FormControl, Input, FormLabel } from '@chakra-ui/react';
import { FC } from 'react';

const Basics: FC = () => {
  const setResume = useResumeStore((state) => state.setResume);
  const basics = useResumeStore((state) => state.resume.data.basics);

  return (
    <section id="basics" className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          {getSectionIcon('basics')}
          <h2 className="line-clamp-1 text-3xl font-bold">Basics</h2>
        </div>
      </header>

      <main className="grid gap-4 sm:grid-cols-2">
        <FormControl className="sm:col-span-2">
          <FormLabel htmlFor="basics.name">Full Name</FormLabel>
          <Input
            id="basics.name"
            value={basics.name}
            isInvalid={
              !basicsSchema
                .pick({ name: true })
                .safeParse({ name: basics.name }).success
            }
            onChange={(event) => setResume('basics.name', event.target.value)}
          />
        </FormControl>

        <FormControl className="sm:col-span-2">
          <FormLabel htmlFor="basics.headline">Headline</FormLabel>
          <Input
            id="basics.headline"
            value={basics.headline}
            onChange={(event) =>
              setResume('basics.headline', event.target.value)
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="basics.email">Email</FormLabel>
          <Input
            id="basics.email"
            placeholder="john.doe@example.com"
            value={basics.email}
            isInvalid={
              !basicsSchema
                .pick({ email: true })
                .safeParse({ email: basics.email }).success
            }
            onChange={(event) => setResume('basics.email', event.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="basics.phone">Phone</FormLabel>
          <Input
            id="basics.phone"
            placeholder="Phone Number"
            value={basics.phone}
            isInvalid={
              !basicsSchema
                .pick({ phone: true })
                .safeParse({ phone: basics.phone }).success
            }
            onChange={(event) => setResume('basics.phone', event.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="basics.location">Location</FormLabel>
          <Input
            id="basics.location"
            placeholder="Your Location"
            value={basics.location}
            isInvalid={
              !basicsSchema
                .pick({ location: true })
                .safeParse({ location: basics.location }).success
            }
            onChange={(event) =>
              setResume('basics.location', event.target.value)
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel>Website</FormLabel>
          <UrlInput
            value={basics.url}
            onChange={(value) => setResume('basics.url', value)}
            placeholder="Your website URL"
          />
        </FormControl>
      </main>
    </section>
  );
};

export default Basics;
