import SectionModal from '@/app/builder/components/Sidebars/left/sections/common/SectionModal';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { defaultInterests, interestsSchema } from 'shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = interestsSchema;
type FormValues = z.infer<typeof formSchema>;

const Interests: FC = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultInterests,
    resolver: zodResolver(formSchema),
  });

  return (
    <SectionModal<FormValues> form={form} defaultValues={defaultInterests}>
      <div className="grid grid-cols-1">
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input placeholder="Tennis" {...form.register('name')} />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input
            placeholder="Tennis description"
            {...form.register('description')}
          />
        </FormControl>
      </div>
    </SectionModal>
  );
};

export default Interests;
