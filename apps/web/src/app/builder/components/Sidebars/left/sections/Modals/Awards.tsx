import SectionModal from '@/app/builder/components/Sidebars/left/sections/common/SectionModal';
import UrlInput from '@/app/builder/components/Sidebars/left/sections/common/UrlInput';
import RichEditor from '@/components/RichEditor';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { awardsSchema, defaultAwards } from 'shared';
import { z } from 'zod';

import { FormItem, Input, FormControl, FormField, FormLabel } from 'ui';

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
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Best Performer" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="awarder"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Awarder</FormLabel>
              <FormControl>
                <Input placeholder="Awarder" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input placeholder="2023-01-01" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="website"
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

        <div className="col-span-2">
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

export default Awards;
