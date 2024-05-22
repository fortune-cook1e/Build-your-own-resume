import SectionModal from '@/app/builder/components/Sidebars/left/sections/common/SectionModal';
import {
  FormControl,
  FormLabel,
  Input,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react';
import { defaultInterests, interestsSchema } from 'shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AnimatePresence, motion } from 'framer-motion';

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
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input placeholder="Tennis" {...form.register('name')} />
        </FormControl>
        <FormControl>
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
    </SectionModal>
  );
};

export default Interests;
