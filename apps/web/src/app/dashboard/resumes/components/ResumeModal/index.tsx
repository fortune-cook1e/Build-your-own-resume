import { useCreateResume } from '@/apis/resume/create';
import { useDeleteResume } from '@/apis/resume/delete';
import { useImportResume } from '@/apis/resume/import';
import { useUpdateResume } from '@/apis/resume/update';
import { FormMode } from '@/types';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogFooter,
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
  IconButton,
  ButtonGroup,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { createResumeSchema, idSchema, sampleResume } from 'shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowDown } from '@phosphor-icons/react';
import { forwardRef, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from 'ui';

const formSchema = createResumeSchema.extend({
  id: idSchema.optional(),
});

export type ResumeModalFormValues = z.infer<typeof formSchema>;

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  mode: FormMode;
  payload?: ResumeModalFormValues;
}

const ResumeModal = forwardRef<any, Props>(
  ({ open, onClose, onSuccess, payload, mode }, ref) => {
    const { toast } = useToast();
    const form = useForm<ResumeModalFormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: '',
        description: '',
      },
    });
    const cancelRef = useRef(null);

    const { updateResume, loading: updateLoading } = useUpdateResume();
    const { createResume, loading: createLoading } = useCreateResume();
    const { deleteResume, loading: deleteLoading } = useDeleteResume();
    const { importResume, loading: importLoading } = useImportResume();

    const isCreate = mode === 'create';
    const isUpdate = mode === 'update';
    const isDelete = mode === 'delete';

    const onReset = () => {
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
        if (!payload?.id) return;
        await updateResume({
          ...payload,
          title: data.title,
          description: data.description,
        });
        toast({
          title: 'Update Success',
        });
      }

      if (isDelete) {
        if (!payload?.id) return;
        await deleteResume(payload.id);
        toast({
          title: 'Delete Success',
        });
      }

      onSuccess?.();
      onClose();
    };

    const onCreateFromSample = async () => {
      await importResume({
        title: 'Sample Title',
        description: 'Sample Description',
        visibility: 'public',
        data: sampleResume,
      });
      toast({
        title: 'Create Sample Resume Success',
      });
      onSuccess?.();
      onClose();
    };

    useEffect(() => {
      open && onReset();
    }, [open]);

    if (isDelete) {
      return (
        <AlertDialog
          isOpen={open}
          onClose={onClose}
          leastDestructiveRef={cancelRef}
        >
          <AlertDialogOverlay />

          <AlertDialogContent>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete {payload?.title} resume
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  type="submit"
                  ml={3}
                  isLoading={deleteLoading}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      );
    }

    return (
      <Modal isOpen={open} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ModalHeader>
              {isCreate && 'Create Resume'}
              {isUpdate && 'Update Resume'}
            </ModalHeader>
            <ModalBody>
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
            </ModalBody>

            <ModalFooter gap={4}>
              <Button onClick={onClose}>Close</Button>
              <ButtonGroup isAttached>
                <Button
                  type="submit"
                  isLoading={updateLoading || createLoading || importLoading}
                >
                  {isCreate && 'Create'}
                  {isUpdate && 'Update'}
                </Button>
                <Menu>
                  <MenuButton as={IconButton} icon={<ArrowDown />}>
                    Actions
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={onCreateFromSample}>
                      Create from sample
                    </MenuItem>
                  </MenuList>
                </Menu>
              </ButtonGroup>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    );
  },
);

export default ResumeModal;
