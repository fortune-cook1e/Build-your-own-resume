import SectionModal from '@/app/builder/components/Sidebars/left/sections/common/SectionModal';
import UrlInput from '@/app/builder/components/Sidebars/left/sections/common/UrlInput';
import RichEditor from '@/components/RichEditor';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { certificationsSchema, defaultCertifications } from 'shared';
import { z } from 'zod';
import { FormItem, Input, FormControl, FormField, FormLabel } from 'ui';

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
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Full-Stack Developer" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="issuer"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Issuer</FormLabel>
              <FormControl>
                <Input placeholder="CodeAcademy" {...field} />
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
                <Input placeholder="2019" {...field} />
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

export default Certifications;
