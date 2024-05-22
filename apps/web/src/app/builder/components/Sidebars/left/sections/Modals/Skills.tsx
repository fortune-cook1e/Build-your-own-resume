import SectionModal from '@/app/builder/components/Sidebars/left/sections/common/SectionModal';
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Tag,
  TagCloseButton,
  TagLabel,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Envelope } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';
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

  const watchKeywords = form.watch('keywords');

  const [pendingKeyword, setPendingKeyword] = useState('');

  const onRemoveKeyword = (word: string) => {
    const newWord = word.trim();
    form.setValue(
      'keywords',
      watchKeywords.filter((keyword) => keyword !== newWord),
    );
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.stopPropagation();
      event.preventDefault();
      form.setValue('keywords', [...watchKeywords, pendingKeyword.trim()]);
      setPendingKeyword('');
    }
  };

  return (
    <SectionModal<FormValues> form={form} defaultValues={defaultSkills}>
      <div className="grid grid-cols-1 gap-4">
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input placeholder="your skill" {...form.register('name')} />
        </FormControl>

        <FormControl>
          <FormLabel>Level</FormLabel>
          <Select placeholder="skill level" {...form.register('level')}>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Proficient">Proficient</option>
            <option value="Expert">Expert</option>
          </Select>
        </FormControl>

        <div className="col-span-2">
          <FormControl className="mb-4">
            <FormLabel>keyword</FormLabel>
            <Input
              placeholder="skill keyword"
              value={pendingKeyword}
              onKeyDown={onKeyDown}
              onChange={(e) => setPendingKeyword(e.target.value)}
            />
          </FormControl>
          <div className="flex flex-wrap items-center gap-y-2 gap-x-2">
            <AnimatePresence>
              {watchKeywords.map((item, index) => {
                return (
                  <motion.div
                    layout
                    key={item}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: index * 0.1 },
                    }}
                    exit={{ opacity: 0, x: -50 }}
                  >
                    <Tag key={item}>
                      <TagLabel>{item}</TagLabel>
                      <TagCloseButton onClick={() => onRemoveKeyword(item)} />
                    </Tag>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </SectionModal>
  );
};

export default Skills;
