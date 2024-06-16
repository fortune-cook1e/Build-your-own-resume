import { useResumeStore } from '@/store/resume';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FormLabel,
  Form,
  FormField,
  FormItem,
  Button,
  Input,
  FormMessage,
} from 'ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { get } from 'lodash-es';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SectionKey, SectionWithItem } from 'shared';
import { z } from 'zod';

interface Props {
  id: SectionKey;
  open: boolean;
  onClose: () => void;
  toggle: () => void;
}

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

type FormValues = z.infer<typeof formSchema>;

const RenameInput: FC<Props> = ({ id, open, toggle, onClose }) => {
  const form = useForm<FormValues>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(formSchema),
  });

  const section = useResumeStore((state) =>
    get(state.resume.data.sections, id),
  ) as SectionWithItem;
  const setValue = useResumeStore((state) => state.setValue);

  useEffect(() => {
    if (open) {
      form.reset({
        name: section.name,
      });
    }
  }, [section, open, form.reset, form]);

  if (!section) return null;

  const onSubmit = (data: FormValues) => {
    setValue(`sections.${id}.name`, data.name);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Please rename {section.name}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="rename-form">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input id="name" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button className="mr-4" variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button
            type="submit"
            form="rename-form"
            disabled={form.formState.isSubmitting}
            loading={form.formState.isSubmitting}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RenameInput;
