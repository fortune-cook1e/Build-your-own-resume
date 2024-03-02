import { QUERY_KEYS } from '@/constants';
import { useUserStore } from '@/store/user';
import { RegisterDto } from '@fe-cookie/resume-generator-shared';
import { User } from '@fe-cookie/resume-generator-shared';
import request from '@/utils/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const register = (data: RegisterDto): Promise<User> =>
  request.post('/auth/register', data);

export const useRegister = () => {
  const queryClient = useQueryClient();
  const setUser = useUserStore((state) => state.setUser);

  const {
    error,
    isPending: loading,
    mutateAsync: registerFn,
  } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      setUser(data);
      queryClient.setQueryData([QUERY_KEYS.user], data);
    },
  });

  return { loading, error, register: registerFn };
};
