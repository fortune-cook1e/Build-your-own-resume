import { QUERY_KEYS } from '@/web/app/constants';
import { useUserStore } from '@/web/app/store/user';
import { RegisterDto } from '@/web/app/types/dto/auth.dto';
import { UserEntity } from '@/web/app/types/entity/user.entity';
import request from '@/web/app/utils/request';
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
