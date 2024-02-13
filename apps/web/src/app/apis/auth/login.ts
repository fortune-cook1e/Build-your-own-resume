import { QUERY_KEYS } from '@/web/app/constants';
import { useUserStore } from '@/web/app/store/user';
import { LoginDto } from '@/web/app/types/dto/auth.dto';
import { LoginEntity } from '@/web/app/types/entity/auth.entity';
import request from '@/web/app/utils/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const login = (data: LoginDto): Promise<LoginEntity> =>
  request.post('/auth/login', data);

export const useLogin = () => {
  const queryClient = useQueryClient();
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
    },
  });

  return { loading, error, login: loginFn };
};
