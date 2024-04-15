import SectionModal from '@/app/builder/components/Sidebars/left/sections/common/SectionModal';
import RickEditor from '@/components/RichEditor';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { defaultEducation, educationSchema } from 'shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = educationSchema;
type formValues = z.infer<typeof formSchema>;

const Education: FC = () => {
  const form = useForm<formValues>({
    defaultValues: defaultEducation,
    resolver: zodResolver(formSchema),
  });

  return (
    <SectionModal<formValues> form={form} defaultValues={defaultEducation}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormControl>
          <FormLabel>College</FormLabel>
          <Input placeholder="Your college" {...form.register('college')} />
        </FormControl>

        <FormControl>
          <FormLabel>Area</FormLabel>
          <Input placeholder="Your Area" {...form.register('area')} />
        </FormControl>

        <div className="sm:col-span-2">
          <FormControl>
            <FormLabel>Major</FormLabel>
            <Input placeholder="computer science" {...form.register('major')} />
          </FormControl>
        </div>

        <div className="sm:col-span-2">
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input placeholder="Start and end" {...form.register('date')} />
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

export default Education;
