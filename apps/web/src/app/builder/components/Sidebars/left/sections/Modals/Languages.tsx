import SectionModal from '@/app/builder/components/Sidebars/left/sections/common/SectionModal';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { defaultLanguages, languagesSchema } from 'shared';
import { z } from 'zod';

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
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="English or something"
            {...form.register('name')}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input
            placeholder="fluent or something"
            {...form.register('description')}
          />
        </FormControl>
      </div>
    </SectionModal>
  );
};

export default Languages;
