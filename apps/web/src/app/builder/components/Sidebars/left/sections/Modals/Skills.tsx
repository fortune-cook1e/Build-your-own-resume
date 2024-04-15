import SectionModal from '@/app/builder/components/Sidebars/left/sections/common/SectionModal';
import { FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { defaultSkills, skillsSchema } from 'shared';
import { z } from 'zod';

const formSchema = skillsSchema;
type FormValues = z.infer<typeof formSchema>;

const Skills: FC = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultSkills,
    resolver: zodResolver(formSchema),
  });

  return (
    <SectionModal<FormValues> form={form} defaultValues={defaultSkills}>
      <div className="grid grid-cols-1 gap-4">
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input placeholder="your skill" {...form.register('name')} />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input
            placeholder="skill description"
            {...form.register('description')}
          />
        </FormControl>

        <div className="col-span-2">
          <FormControl>Level</FormControl>
          <Select placeholder="skill level" {...form.register('level')}>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Proficient">Proficient</option>
            <option value="Expert">Expert</option>
          </Select>
        </div>
      </div>
    </SectionModal>
  );
};

export default Skills;
