import { useUser } from '@/apis/user/user';

import { UpdateUserDto, updateUserSchema } from 'shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { AnimatePresence, motion } from 'framer-motion';
import { useUpdateUser } from '@/apis/user/update';
import UserAvatar from '@/components/UserAvatar';
import { Check, Warning } from '@phosphor-icons/react';
import { useResendEmail } from '@/apis/auth/resend-email';
import {
  useToast,
  Button,
  FormControl,
  Form,
  FormField,
  FormDescription,
  FormItem,
  Input,
  FormLabel,
  cn,
} from 'ui';

const AccountSetting = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const { loading, updateUser } = useUpdateUser();
  const { loading: resendLoading, resendEmail } = useResendEmail();
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

  const onResendEmail = async () => {
    const email = form.getValues('email');
    if (!email) return;
    await resendEmail(email);
    toast({
      status: 'success',
      title: 'Resend email success',
      description: 'We have sent you a new email verification link',
      isClosable: true,
      duration: 2000,
      position: 'top',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold leading-relaxed tracking-tight text-foreground">
          Account
        </h3>
        <p className="leading-relaxed text-secondary-foreground opacity-75">
          Here, you can update your account information such as your profile
          picture, name and username.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center justify-between gap-x-4">
            <FormField
              name="avatar"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <UserAvatar size={50} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

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
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormDescription
                  className={cn(
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
                </FormDescription>
              </FormItem>
            )}
          />

          <AnimatePresence presenceAffectsLayout>
            {form.formState.isDirty && (
              <motion.div
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-end space-x-2 sm:col-start-2"
              >
                <Button variant="ghost" onClick={onReset}>
                  Discard
                </Button>
                <Button type="submit" disabled={loading}>
                  Save
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </Form>
    </div>
  );
};

export default AccountSetting;
