import { getSectionIcon } from '@/app/builder/components/Sidebars/left/sections/common/SectionIcon';
import UrlInput from '@/app/builder/components/Sidebars/left/sections/common/UrlInput';
import { useResumeStore } from '@/store/resume';
import { basicsSchema } from 'shared';
import { Label, Input } from 'ui';

const Basics = () => {
  const setValue = useResumeStore((state) => state.setValue);
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
        <div className="space-y-4 sm:col-span-2">
          <Label htmlFor="basics.name">Full Name</Label>
          <Input
            id="basics.name"
            value={basics.name}
            isInvalid={
              !basicsSchema
                .pick({ name: true })
                .safeParse({ name: basics.name }).success
            }
            onChange={(event) => setValue('basics.name', event.target.value)}
          />
        </div>

        <div className="space-y-4 sm:col-span-2">
          <Label htmlFor="basics.headline">Headline</Label>
          <Input
            id="basics.headline"
            value={basics.headline}
            onChange={(event) =>
              setValue('basics.headline', event.target.value)
            }
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="basics.email">Email</Label>
          <Input
            id="basics.email"
            placeholder="john.doe@example.com"
            value={basics.email}
            isInvalid={
              !basicsSchema
                .pick({ email: true })
                .safeParse({ email: basics.email }).success
            }
            onChange={(event) => setValue('basics.email', event.target.value)}
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="basics.phone">Phone</Label>
          <Input
            id="basics.phone"
            placeholder="Phone Number"
            value={basics.phone}
            isInvalid={
              !basicsSchema
                .pick({ phone: true })
                .safeParse({ phone: basics.phone }).success
            }
            onChange={(event) => setValue('basics.phone', event.target.value)}
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="basics.location">Location</Label>
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
              setValue('basics.location', event.target.value)
            }
          />
        </div>

        <div className="space-y-4">
          <Label>Website</Label>
          <UrlInput
            value={basics.url}
            onChange={(value) => setValue('basics.url', value)}
            placeholder="Your website URL"
          />
        </div>
      </main>
    </section>
  );
};

export default Basics;
