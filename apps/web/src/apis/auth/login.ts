import { QUERY_KEYS } from '@/web/constants';
import { useUserStore } from '@/web/store/user';
import { LoginDto } from '@/web/types/dto/auth.dto';
import { LoginEntity } from '@/web/types/entity/auth.entity';
import request from '@/web/utils/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const login = (data: LoginDto): Promise<LoginEntity> =>
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
      queryClient.setQueryData([QUERY_KEYS.user], data.user);
      router.push('/resumes');
    },
  });

  return { loading, error, login: loginFn };
};
