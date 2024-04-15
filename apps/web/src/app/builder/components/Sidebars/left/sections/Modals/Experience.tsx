import SectionModal from '@/app/builder/components/Sidebars/left/sections/common/SectionModal';
import RickEditor from '@/components/RichEditor';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { defaultExperience, experienceSchema } from 'shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { values } from 'lodash-es';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = experienceSchema;
type FormValues = z.infer<typeof formSchema>;

const Experience: FC = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultExperience,
    resolver: zodResolver(formSchema),
  });

  return (
    <SectionModal<FormValues> form={form} defaultValues={defaultExperience}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormControl>
          <FormLabel>Position</FormLabel>
          <Input
            placeholder="FrontEnd Developer"
            {...form.register('position')}
          />
        </FormControl>

        <FormControl>
          <FormLabel>location</FormLabel>
          <Input
            placeholder="Company Location"
            {...form.register('location')}
          />
        </FormControl>

        <div className="sm:col-span-2">
          <FormControl>
            <FormLabel>company</FormLabel>
            <Input placeholder="Company" {...form.register('company')} />
          </FormControl>
        </div>

        <div className="sm:col-span-2">
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input placeholder="Date" {...form.register('date')} />
          </FormControl>
        </div>

        <div className="sm:col-span-2">
          <Controller
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormControl>
                <FormLabel>Summary</FormLabel>
                <RickEditor
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

export default Experience;
