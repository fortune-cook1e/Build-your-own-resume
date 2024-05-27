import SectionModal from '@/app/builder/components/Sidebars/left/sections/common/SectionModal';
import UrlInput from '@/app/builder/components/Sidebars/left/sections/common/UrlInput';
import RichEditor from '@/components/RichEditor';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { awardsSchema, defaultAwards } from 'shared';
import { z } from 'zod';

const formSchema = awardsSchema;
type FormValues = z.infer<typeof formSchema>;

const Awards = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultAwards,
    resolver: zodResolver(formSchema),
  });

  return (
    <SectionModal<FormValues> form={form} defaultValues={defaultAwards}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input placeholder="Best Performer" {...form.register('title')} />
        </FormControl>

        <FormControl>
          <FormLabel>Awarder</FormLabel>
          <Input placeholder="company" {...form.register('awarder')} />
        </FormControl>

        <FormControl>
          <FormLabel>Date</FormLabel>
          <Input placeholder="2023-01-01" {...form.register('date')} />
        </FormControl>

        <Controller
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormControl>
              <FormLabel>Website</FormLabel>
              <UrlInput {...field} />
            </FormControl>
          )}
        />

        <div className="col-span-2">
          <Controller
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormControl>
                <FormLabel>Summary</FormLabel>
                <RichEditor
                  {...field}
                  content={field.value}
                  onChange={(val) => field.onChange(val)}
                />
              </FormControl>
            )}
          />
        </div>
      </div>
    </SectionModal>
  );
};

export default Awards;
