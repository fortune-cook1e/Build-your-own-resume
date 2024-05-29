import SectionModal from '@/app/builder/components/Sidebars/left/sections/common/SectionModal';
import UrlInput from '@/app/builder/components/Sidebars/left/sections/common/UrlInput';
import RichEditor from '@/components/RichEditor';
import {
  FormControl,
  FormLabel,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { customSchema, defaultCustom } from 'shared';
import { z } from 'zod';
import { AnimatePresence, motion } from 'framer-motion';

const formSchema = customSchema;
type FormValues = z.infer<typeof formSchema>;

const Custom = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultCustom,
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
    <SectionModal<FormValues> form={form} defaultValues={defaultCustom}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input placeholder="name" {...form.register('name')} />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input placeholder="description" {...form.register('description')} />
        </FormControl>

        <FormControl>
          <FormLabel>Date</FormLabel>
          <Input placeholder="date" {...form.register('date')} />
        </FormControl>

        <FormControl>
          <FormLabel>Location</FormLabel>
          <Input placeholder="location" {...form.register('location')} />
        </FormControl>

        <div className="col-span-2">
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
        </div>

        <div className="sm:col-span-2">
          <Controller
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormControl>
                <FormLabel>Summary</FormLabel>
                <RichEditor {...field} content={field.value} />
              </FormControl>
            )}
          />
        </div>

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

export default Custom;
