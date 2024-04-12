import { QUERY_KEYS } from '@/constants';
import { useUserStore } from '@/store/user';
import { RegisterDto } from '@fe-cookie/resume-generator-shared';
import { User } from '@fe-cookie/resume-generator-shared';
import request from '@/utils/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const register = (data: RegisterDto): Promise<User> =>
  request.post('/auth/register', data);

export const useRegister = () => {
  const router = useRouter();
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
      queryClient.setQueryData(QUERY_KEYS.user, data);
      router.push('/dashboard/resumes');
    },
  });

  return { loading, error, register: registerFn };
};
