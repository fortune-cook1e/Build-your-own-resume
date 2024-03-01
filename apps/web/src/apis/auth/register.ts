import { QUERY_KEYS } from '@/constants';
import { useUserStore } from '@/store/user';
import { RegisterDto } from '@/types/dto/auth/index.dto';
import { UserEntity } from '@/types/entity/user';
import request from '@/utils/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const register = (data: RegisterDto): Promise<UserEntity> =>
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
