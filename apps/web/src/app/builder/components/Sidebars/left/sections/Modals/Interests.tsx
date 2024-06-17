import SectionModal from '@/app/builder/components/Sidebars/left/sections/common/SectionModal';

import { FormItem, Input, FormControl, FormField, FormLabel, Badge } from 'ui';

import { defaultInterests, interestsSchema } from 'shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from '@phosphor-icons/react';

const formSchema = interestsSchema;
type FormValues = z.infer<typeof formSchema>;

const Interests: FC = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultInterests,
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
    <SectionModal<FormValues> form={form} defaultValues={defaultInterests}>
      <div className="grid grid-cols-1 gap-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Tennis" {...field} />
              </FormControl>
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

export default Interests;
