import { QUERY_KEYS } from '@/constants';
import { queryClient } from '@/utils/queryClient';
import request from '@/utils/request';
import { useMutation } from '@tanstack/react-query';

const verifyEmail = (token: string) =>
  request.post('/auth/verify-email', {
    token,
  });

export const useVerifyEmail = () => {
  const { isPending: loading, mutateAsync: verifyEmailFn } = useMutation({
    mutationFn: verifyEmail,
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user });
    },
  });

  return {
    loading,
    verifyEmail: verifyEmailFn,
  };
};
