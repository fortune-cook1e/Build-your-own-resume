import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Portal,
} from '@chakra-ui/react';
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
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        form.handleSubmit(onSubmit)(e);
      }}
      className="space-y-3"
    >
      <FormControl>
        <FormLabel>Image Url</FormLabel>
        <Input placeholder="Image url" {...form.register('src')} />
      </FormControl>
      <FormControl>
        <FormLabel>Image Alt</FormLabel>
        <Input placeholder="Image alt" {...form.register('alt')} />
      </FormControl>
      <Button type="submit">Insert Image</Button>
    </form>
  );
});

export default ImageForm;
