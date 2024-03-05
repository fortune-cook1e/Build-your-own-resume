import { useCreateResume } from '@/apis/resume/create';
import { useUpdateResume } from '@/apis/resume/update';
import { FormMode } from '@/types';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import {
  createResumeSchema,
  idSchema,
} from '@fe-cookie/resume-generator-shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = createResumeSchema.extend({
  id: idSchema.optional(),
});

export type ResumeModalFormValues = z.infer<typeof formSchema>;

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  mode: FormMode;
  payload: ResumeModalFormValues;
}

const ResumeModal = forwardRef<any, Props>(
  ({ open, onClose, onSuccess, payload, mode }, ref) => {
    const toast = useToast();
    const form = useForm<ResumeModalFormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: '',
        description: '',
      },
    });

    const { updateResume, loading: updateLoading } = useUpdateResume();
    const { createResume, loading: createLoading } = useCreateResume();

    const isCreate = mode === 'create';
    const isUpdate = mode === 'update';

    const onReset = () => {
      console.log({ mode, payload });
      if (isCreate) {
        form.reset({
          title: '',
          description: '',
        });
      }
      if (isUpdate) {
        form.reset({
          ...form.getValues(),
          ...payload,
        });
      }
    };

    const onSubmit = async (data: ResumeModalFormValues) => {
      if (isCreate) {
        await createResume(data);
        toast({
          title: 'Create Success',
        });
      }
      if (isUpdate) {
        await updateResume({
          ...payload,
          title: data.title,
          description: data.description,
        });
        toast({
          title: 'Update Success',
        });
      }

      onSuccess?.();
      onClose();
    };

    useEffect(() => {
      open && onReset();
    }, [open]);

    return (
      <Modal isOpen={open} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isCreate && 'Create Resume'}
            {isUpdate && 'Update Resume'}
          </ModalHeader>
          <ModalBody>
            <form id="resume-form" onSubmit={form.handleSubmit(onSubmit)}>
              <FormControl className="mb-4">
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder="Input your title"
                  {...form.register('title')}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  placeholder="Input your description"
                  {...form.register('description')}
                />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter gap={4}>
            <Button onClick={onClose}>Close</Button>
            <Button
              colorScheme="blue"
              form="resume-form"
              type="submit"
              isLoading={updateLoading || createLoading}
            >
              {isCreate && 'Create'}
              {isUpdate && 'Update'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  },
);

export default ResumeModal;
