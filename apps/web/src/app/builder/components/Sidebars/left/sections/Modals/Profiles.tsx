import IconInput from '@/app/builder/components/Sidebars/left/sections/common/IconInput';
import SectionModal from '@/app/builder/components/Sidebars/left/sections/common/SectionModal';
import UrlInput from '@/app/builder/components/Sidebars/left/sections/common/UrlInput';
import { defaultProfile, profileSchema } from 'shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FC } from 'react';
import { FormItem, Input, FormControl, FormField, FormLabel } from 'ui';

const formSchema = profileSchema;
type FormValues = z.infer<typeof formSchema>;

const Profiles: FC = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultProfile,
    resolver: zodResolver(formSchema),
  });

  return (
    <SectionModal<FormValues> form={form} defaultValues={defaultProfile}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          name="network"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Network</FormLabel>
              <FormControl>
                <Input placeholder="Your network" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Your username" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="sm:col-span-2">
          <FormField
            name="url"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <UrlInput {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="sm:col-span-2">
          <FormField
            name="icon"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <IconInput {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </SectionModal>
  );
};

export default Profiles;
