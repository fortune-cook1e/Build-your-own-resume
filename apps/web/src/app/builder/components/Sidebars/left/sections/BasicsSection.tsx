import { getSectionIcon } from '@/web/app/builder/components/Sidebars/left/sections/common/IconSection';
import { useResumeStore } from '@/web/store/resume';
import { FormControl, Input, FormLabel } from '@chakra-ui/react';
import { FC } from 'react';

const BasicsSection: FC = () => {
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

      <form>
        <main className="grid gap-4 sm:grid-cols-2">
          <FormControl>
            <FormLabel htmlFor="basics.name">Full Name</FormLabel>
            <Input
              id="basics.name"
              value={basics.name}
              // hasError={
              //   !basicsSchema
              //     .pick({ name: true })
              //     .safeParse({ name: basics.name }).success
              // }
              onChange={(event) => setResume('basics.name', event.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="basics.email">Email</FormLabel>
            <Input
              id="basics.email"
              placeholder="john.doe@example.com"
              value={basics.email}
              // hasError={
              //   !basicsSchema.pick({ email: true }).safeParse({ email: basics.email }).success
              // }
              onChange={(event) =>
                setResume('basics.email', event.target.value)
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="basics.phone">Phone</FormLabel>
            <Input
              id="basics.phone"
              placeholder="Phone Number"
              value={basics.phone}
              // hasError={
              //   !basicsSchema.pick({ email: true }).safeParse({ email: basics.email }).success
              // }
              onChange={(event) =>
                setResume('basics.phone', event.target.value)
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="basics.location">Phone</FormLabel>
            <Input
              id="basics.location"
              placeholder="Your Location"
              value={basics.location}
              // hasError={
              //   !basicsSchema.pick({ email: true }).safeParse({ email: basics.email }).success
              // }
              onChange={(event) =>
                setResume('basics.location', event.target.value)
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="basics.url">Url</FormLabel>
            <Input
              id="basics.url"
              placeholder="Your Location"
              value={basics.url.link}
              // hasError={
              //   !basicsSchema.pick({ email: true }).safeParse({ email: basics.email }).success
              // }
              // Todo: need to adjust url value
              onChange={(event) => setResume('basics.url', event.target.value)}
            />
          </FormControl>
        </main>
      </form>
    </section>
  );
};

export default BasicsSection;
