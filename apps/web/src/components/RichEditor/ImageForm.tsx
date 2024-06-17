import {
  Button,
  FormItem,
  FormControl,
  FormLabel,
  Input,
  Form,
  FormField,
} from 'ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const ImageFormSchema = z.object({
  src: z.string(),
  alt: z.string().optional(),
});

type ImageFormValues = z.infer<typeof ImageFormSchema>;

interface Props {
  onInsert: (value: ImageFormValues) => void;
}

const ImageForm = forwardRef<any, Props>(({ onInsert }, ref) => {
  const form = useForm<ImageFormValues>({
    defaultValues: {
      src: '',
      alt: '',
    },
    resolver: zodResolver(ImageFormSchema),
  });

  const onSubmit = (values: ImageFormValues) => {
    onInsert(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          form.handleSubmit(onSubmit)(e);
        }}
        className="space-y-4"
      >
        <FormField
          name="src"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Url</FormLabel>
              <FormControl>
                <Input placeholder="Image url" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="alt"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Alt</FormLabel>
              <FormControl>
                <Input placeholder="Image alt" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Insert Image</Button>
      </form>
    </Form>
  );
});

export default ImageForm;
