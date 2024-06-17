import SectionModal from '@/app/builder/components/Sidebars/left/sections/common/SectionModal';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { defaultLanguages, languagesSchema } from 'shared';
import { z } from 'zod';
import { FormItem, Input, FormControl, FormField, FormLabel } from 'ui';

const formSchema = languagesSchema;
type FormValues = z.infer<typeof formSchema>;

const Languages: FC = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultLanguages,
    resolver: zodResolver(formSchema),
  });

  return (
    <SectionModal<FormValues> form={form} defaultValues={defaultLanguages}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="English or something" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="fluent or something" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </SectionModal>
  );
};

export default Languages;
