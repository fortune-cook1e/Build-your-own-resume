import SectionModal from '@/app/builder/components/Sidebars/left/sections/common/SectionModal';
import RickEditor from '@/components/RichEditor';
import { defaultEducation, educationSchema } from 'shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormItem, Input, FormControl, FormField, FormLabel } from 'ui';

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
        <FormField
          name="college"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>College</FormLabel>
              <FormControl>
                <Input placeholder="Your college" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="area"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Area</FormLabel>
              <FormControl>
                <Input placeholder="Your Area" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="sm:col-span-2">
          <FormField
            name="major"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Major</FormLabel>
                <FormControl>
                  <Input placeholder="computer science" {...field} />
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
                  <RickEditor content={field.value} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </SectionModal>
  );
};

export default Education;
