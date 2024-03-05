import { QUERY_KEYS } from '@/constants';
import { useUserStore } from '@/store/user';
import { LoginDto, LoginRes } from '@fe-cookie/resume-generator-shared';
import request from '@/utils/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const login = (data: LoginDto): Promise<LoginRes> =>
  request.post('/auth/login', data);

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const {
    error,
    isPending: loading,
    mutateAsync: loginFn,
  } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.setQueryData(QUERY_KEYS.user, data.user);
      router.push('/resumes');
    },
  });

  return { loading, error, login: loginFn };
};
