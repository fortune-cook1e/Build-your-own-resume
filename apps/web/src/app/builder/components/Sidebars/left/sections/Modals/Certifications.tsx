import SectionModal from '@/app/builder/components/Sidebars/left/sections/common/SectionModal';
import UrlInput from '@/app/builder/components/Sidebars/left/sections/common/UrlInput';
import RichEditor from '@/components/RichEditor';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { certificationsSchema, defaultCertifications } from 'shared';
import { z } from 'zod';

const formSchema = certificationsSchema;
type FormValues = z.infer<typeof formSchema>;

const Certifications = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultCertifications,
    resolver: zodResolver(formSchema),
  });

  return (
    <SectionModal<FormValues> form={form} defaultValues={defaultCertifications}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Full-Stack Developer"
            {...form.register('name')}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input placeholder="CodeAcademy" {...form.register('issuer')} />
        </FormControl>

        <FormControl>
          <FormLabel>Date</FormLabel>
          <Input placeholder="2019" {...form.register('date')} />
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
                <RichEditor content={field.value} {...field} />
              </FormControl>
            )}
          />
        </div>
      </div>
    </SectionModal>
  );
};

export default Certifications;
