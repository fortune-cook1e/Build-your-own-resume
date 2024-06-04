import request from '@/utils/request';
import { useMutation } from '@tanstack/react-query';

const resendEmail = (email: string) =>
  request.post(
    '/auth/verify-email/resend',
    { email },
    {
      timeout: 1000 * 60,
    },
  );

export const useResendEmail = () => {
  const { isPending: loading, mutateAsync: resendEmailFn } = useMutation({
    mutationFn: resendEmail,
  });
  return {
    loading,
    resendEmail: resendEmailFn,
  };
};
