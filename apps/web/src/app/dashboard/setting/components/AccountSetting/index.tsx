import { useUser } from '@/apis/user/user';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { UpdateUserDto, mergeTailwindCss, updateUserSchema } from 'shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { AnimatePresence, motion } from 'framer-motion';
import { useUpdateUser } from '@/apis/user/update';
import UserAvatar from '@/components/UserAvatar';
import { Check, Warning } from '@phosphor-icons/react';
import { useResendEmail } from '@/apis/auth/resend-email';

const AccountSetting = () => {
  const { user } = useUser();
  const toast = useToast();
  const { loading, updateUser } = useUpdateUser();
  const { loading: resendLoading, resendEmail } = useResendEmail();
  const { reset, register, getValues, handleSubmit, formState, control } =
    useForm<UpdateUserDto>({
      resolver: zodResolver(updateUserSchema),
      defaultValues: {
        name: '',
        username: '',
        email: '',
      },
    });

  const onReset = () => {
    if (!user) return;
    reset({
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

  const onResendEmail = async () => {
    const email = getValues('email');
    if (!email) return;
    await resendEmail(email);
    toast({
      status: 'success',
      title: 'Resend email success',
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex justify-between items-center gap-x-4">
          <Controller
            name="avatar"
            control={control}
            render={({ field }) => <UserAvatar size={50} {...field} />}
          />

          <FormControl className="flex-1">
            <FormLabel>Name</FormLabel>
            <Input placeholder="name" {...register('name')} />
          </FormControl>

          <FormControl className="flex-1">
            <FormLabel>Username</FormLabel>
            <Input placeholder="Username" {...register('username')} />
          </FormControl>
        </div>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input placeholder="email" {...register('email')} />
          <FormHelperText
            className={mergeTailwindCss(
              'flex items-center gap-x-1.5 font-medium opacity-100',
              user?.emailVerified
                ? 'text-success-accent'
                : 'text-warning-accent',
            )}
          >
            {user?.emailVerified ? <Check /> : <Warning size={12} />}
            {user?.emailVerified ? 'Verified' : 'Unverified'}
            {!user?.emailVerified && (
              <Button
                disabled={resendLoading}
                variant="link"
                className="h-auto text-xs"
                onClick={onResendEmail}
              >
                Resend email confirmation link
              </Button>
            )}
          </FormHelperText>
        </FormControl>

        <AnimatePresence presenceAffectsLayout>
          {formState.isDirty && (
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
