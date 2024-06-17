import SectionModal from '@/app/builder/components/Sidebars/left/sections/common/SectionModal';
import UrlInput from '@/app/builder/components/Sidebars/left/sections/common/UrlInput';
import { defaultProjects, projectsSchema } from 'shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import RichEditor from '@/components/RichEditor';
import { FormItem, Input, FormControl, FormField, FormLabel } from 'ui';

const formSchema = projectsSchema;
type FormValues = z.infer<typeof formSchema>;

const Projects: FC = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultProjects,
    resolver: zodResolver(formSchema),
  });

  return (
    <SectionModal<FormValues> form={form} defaultValues={defaultProjects}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Project name" {...field} />
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
                <Input placeholder="Project description" {...field} />
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
                <Input placeholder="Date range" {...field} />
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

export default Projects;
