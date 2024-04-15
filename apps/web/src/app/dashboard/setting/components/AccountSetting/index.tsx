import { useUser } from '@/apis/user/user';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  useToast,
} from '@chakra-ui/react';
import { UpdateUserDto, mergeTailwindCss, updateUserSchema } from 'shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { AnimatePresence, motion } from 'framer-motion';
import { useUpdateUser } from '@/apis/user/update';
import UserAvatar from '@/components/UserAvatar';
import { Check, UploadSimple, Warning } from '@phosphor-icons/react';
import { useUploadImage } from '@/apis/oss/uploadImage';
import { useResendEmail } from '@/apis/auth/resend-email';

const AccountSetting = () => {
  const { user } = useUser();
  const toast = useToast();
  const { loading, updateUser } = useUpdateUser();
  const { loading: uploading, uploadImage } = useUploadImage();
  const { loading: resendLoading, resendEmail } = useResendEmail();
  const form = useForm<UpdateUserDto>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
    },
  });
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const onReset = () => {
    if (!user) return;
    form.reset({
      ...user,
    });
  };

  useEffect(() => {
    user && onReset();
  }, [user]);

  const onSelectImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const avatarUrl = await uploadImage(file);
      await updateUser({
        avatar: avatarUrl,
      });
      toast({
        status: 'success',
        title: 'Upload avatar success',
      });
    }
  };

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
        className="grid gap-4 sm:grid-cols-2"
      >
        <div className="flex items-end gap-x-4 sm:col-span-2">
          <UserAvatar />
          <FormControl className="flex-1">
            <FormLabel>Avatar</FormLabel>
            <Input placeholder="http://..." {...form.register('avatar')} />
            {!user?.avatar && (
              <>
                <Input
                  type="file"
                  hidden
                  ref={uploadInputRef}
                  onChange={onSelectImage}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <IconButton
                    disabled={uploading}
                    aria-label="select image"
                    icon={<UploadSimple />}
                    onClick={() => uploadInputRef.current?.click()}
                  />
                </motion.div>
              </>
            )}
          </FormControl>
        </div>

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
