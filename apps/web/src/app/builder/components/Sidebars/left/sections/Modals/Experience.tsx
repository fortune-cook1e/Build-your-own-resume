import SectionModal from '@/app/builder/components/Sidebars/left/sections/common/SectionModal';
import { defaultExperience, experienceSchema } from 'shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormItem, Input, FormControl, FormField, FormLabel } from 'ui';
import RichEditor from '@/components/RichEditor';

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
        <FormField
          name="position"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input placeholder="FrontEnd Developer" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="location"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Company Location" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="sm:col-span-2">
          <FormField
            name="company"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Company" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="sm:col-span-2">
          <FormField
            name="date"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input placeholder="Date" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="sm:col-span-2">
          <FormField
            name="summary"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Summary</FormLabel>
                <FormControl>
                  <RichEditor content={field.value} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </SectionModal>
  );
};

export default Experience;
