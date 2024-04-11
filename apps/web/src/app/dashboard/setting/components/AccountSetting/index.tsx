import { useUser } from '@/apis/user/user';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import {
  UpdateUserDto,
  updateUserSchema,
} from '@fe-cookie/resume-generator-shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { AnimatePresence, motion } from 'framer-motion';
import { useUpdateUser } from '@/apis/user/update';

const AccountSetting = () => {
  const { user } = useUser();
  const toast = useToast();
  const { loading, updateUser } = useUpdateUser();
  const form = useForm<UpdateUserDto>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
    },
  });

  const onReset = () => {
    if (!user) return;
    form.reset({
      ...user,
    });
  };

  useEffect(() => {
    user && onReset();
  }, [user]);

  const onSubmit = async (values: UpdateUserDto) => {
    if (!values) return;

    await updateUser(values);
    toast({
      status: 'success',
      title: 'Update succuess',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold leading-relaxed tracking-tight">
          Account
        </h3>
        <p className="leading-relaxed opacity-75">
          Here, you can update your account information such as your profile
          picture, name and username.
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-6 sm:grid-cols-2"
      >
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input placeholder="name" {...form.register('name')} />
        </FormControl>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input placeholder="Username" {...form.register('username')} />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input placeholder="email" {...form.register('email')} />
        </FormControl>

        <AnimatePresence presenceAffectsLayout>
          {form.formState.isDirty && (
            <motion.div
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-end space-x-2 sm:col-start-2"
            >
              <Button type="submit" disabled={loading}>
                Save Changes
              </Button>
              <Button variant="ghost" onClick={onReset}>
                Discard
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default AccountSetting;
