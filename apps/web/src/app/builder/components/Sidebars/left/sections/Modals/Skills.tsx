import SectionModal from '@/app/builder/components/Sidebars/left/sections/common/SectionModal';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { defaultSkills, skillsSchema } from 'shared';
import { z } from 'zod';
import {
  FormItem,
  Input,
  FormControl,
  FormField,
  FormLabel,
  Badge,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'ui';
import { X } from '@phosphor-icons/react';

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
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your skill" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="level"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Proficient">Proficient</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>keyword</FormLabel>
          <FormControl>
            <Input
              placeholder="skill keyword"
              value={pendingKeyword}
              onKeyDown={onKeyDown}
              onChange={(e) => setPendingKeyword(e.target.value)}
            />
          </FormControl>
        </FormItem>

        <div className="flex flex-wrap items-center gap-2">
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
                  <Badge
                    key={item}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <span>{item}</span>
                    <X onClick={() => onRemoveKeyword(item)} />
                  </Badge>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </SectionModal>
  );
};

export default Skills;
