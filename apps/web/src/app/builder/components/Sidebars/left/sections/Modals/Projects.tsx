import SectionModal from '@/app/builder/components/Sidebars/left/sections/common/SectionModal';
import UrlInput from '@/app/builder/components/Sidebars/left/sections/common/UrlInput';
import RickEditor from '@/components/RichEditor';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import {
  defaultProjects,
  projectsSchema,
} from '@fe-cookie/resume-generator-shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

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
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input placeholder="Project name" {...form.register('name')} />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input
            placeholder="Project description"
            {...form.register('description')}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Date</FormLabel>
          <Input placeholder="Date range" {...form.register('date')} />
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

export default Projects;
