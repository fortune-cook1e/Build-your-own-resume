import IconInput from '@/web/app/builder/components/Sidebars/left/sections/common/IconInput';
import SectionModal from '@/web/app/builder/components/Sidebars/left/sections/common/SectionModal';
import UrlInput from '@/web/app/builder/components/Sidebars/left/sections/common/UrlInput';
import {
  defaultProfile,
  profileSchema,
} from '@/web/types/entity/resume/sections/profile';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';

const formSchema = profileSchema;
type FormValues = z.infer<typeof formSchema>;

const Profiles = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultProfile,
    resolver: zodResolver(formSchema),
  });

  return (
    <SectionModal<FormValues> form={form} defaultValues={defaultProfile}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormControl>
          <FormLabel>Network</FormLabel>
          <Input placeContent="Your network" {...form.register('network')} />
        </FormControl>

        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input placeContent="Your username" {...form.register('username')} />
        </FormControl>

        <div className="sm:col-span-2">
          <Controller
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormControl>
                <FormLabel>Website</FormLabel>
                <UrlInput {...field} />
              </FormControl>
            )}
          ></Controller>
        </div>

        <div className="sm:col-span-2">
          <Controller
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormControl>
                <FormLabel>Icon</FormLabel>
                <IconInput {...field} />
              </FormControl>
            )}
          ></Controller>
        </div>
      </div>
    </SectionModal>
  );
};

export default Profiles;
