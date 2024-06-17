import SectionModal from '@/app/builder/components/Sidebars/left/sections/common/SectionModal';
import UrlInput from '@/app/builder/components/Sidebars/left/sections/common/UrlInput';
import RichEditor from '@/components/RichEditor';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { customSchema, defaultCustom } from 'shared';
import { z } from 'zod';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from '@phosphor-icons/react';

import {
  FormItem,
  Input,
  FormControl,
  FormField,
  FormLabel,
  Badge,
  FormMessage,
} from 'ui';

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
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="description" {...field} />
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
                <Input placeholder="date" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="location"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Company Location" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="col-span-2">
          <FormField
            name="website"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <UrlInput {...field} />
                </FormControl>
                {/* <FormMessage>Invalid website url</FormMessage> */}
              </FormItem>
            )}
          />

          {/* <Controller
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormControl isInvalid={!!form.formState.errors.website}>
                <FormLabel>Website</FormLabel>
                <UrlInput {...field} />
                <FormErrorMessage>
                  {form.formState.errors.website &&
                    form.formState.errors.website.link?.message}
                </FormErrorMessage>
              </FormControl>
            )}
          /> */}
        </div>

        <div className="sm:col-span-2">
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

        <div className="col-span-2">
          <FormItem>
            <FormLabel>keyword</FormLabel>
            <FormControl>
              <Input
                placeholder="keyword"
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
      </div>
    </SectionModal>
  );
};

export default Custom;
