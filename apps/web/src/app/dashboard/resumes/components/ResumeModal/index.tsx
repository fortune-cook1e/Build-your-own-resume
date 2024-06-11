import { useCreateResume } from '@/apis/resume/create';
import { useDeleteResume } from '@/apis/resume/delete';
import { useImportResume } from '@/apis/resume/import';
import { useUpdateResume } from '@/apis/resume/update';
import { FormMode } from '@/types';

import { createResumeSchema, idSchema, sampleResume } from 'shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaretDown } from '@phosphor-icons/react';
import { forwardRef, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  useToast,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Form,
  Input,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  cn,
} from 'ui';

const formSchema = createResumeSchema.extend({
  id: idSchema.optional(),
});

export type ResumeModalFormValues = z.infer<typeof formSchema>;

interface Props {
  open: boolean;
  onClose: () => void;
  toggle: (boolean: boolean) => void;
  onSuccess?: () => void;
  mode: FormMode;
  payload?: ResumeModalFormValues;
}

const ResumeModal = forwardRef<any, Props>(
  ({ open, onClose, onSuccess, payload, mode, toggle }, ref) => {
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

    const isSaving = updateLoading || createLoading || importLoading;

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
        <AlertDialog open={open} onOpenChange={toggle}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Delete {payload?.title} resume
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure? You can't undo this action afterwards.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <div className="flex items-center gap-x-4">
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={form.handleSubmit(onSubmit)}
                      disabled={deleteLoading}
                      loading={deleteLoading}
                    >
                      Delete
                    </Button>
                  </div>
                </AlertDialogFooter>
              </AlertDialogContent>
            </form>
          </Form>
        </AlertDialog>
      );
    }

    return (
      <Dialog open={open} onOpenChange={toggle}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isCreate && 'Create Resume'}
              {isUpdate && 'Update Resume'}
            </DialogTitle>
            <DialogDescription>
              Make changes to your resume here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Input your title" {...field} />
                    </FormControl>
                    <FormMessage />
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
                      <Input placeholder="Input your description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <div className="flex items-center">
                  <Button
                    onClick={onClose}
                    variant="ghost"
                    className="mr-4 text-foreground"
                  >
                    Close
                  </Button>
                  <Button
                    disabled={isSaving}
                    loading={isSaving}
                    type="submit"
                    className={cn(isCreate && 'rounded-r-none')}
                  >
                    Save
                  </Button>

                  {isCreate && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" className="rounded-l-none border-l">
                          <CaretDown />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent side="right" align="center">
                        <DropdownMenuItem onClick={onCreateFromSample}>
                          Created from sample
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  },
);

export default ResumeModal;
