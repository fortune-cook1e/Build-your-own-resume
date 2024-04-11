import { QUERY_KEYS } from '@/constants';
import { useUserStore } from '@/store/user';
import { queryClient } from '@/utils/queryClient';
import request from '@/utils/request';
import { UpdateUserDto, User } from '@fe-cookie/resume-generator-shared';
import { useMutation } from '@tanstack/react-query';

const updateUser = (data: UpdateUserDto): Promise<User> =>
  request.post('/user/update', data);

export const useUpdateUser = () => {
  const setUser = useUserStore((state) => state.setUser);

  const { isPending: loading, mutateAsync: updateUserFn } = useMutation({
    mutationFn: updateUser,
    onSuccess(data) {
      queryClient.setQueryData(QUERY_KEYS.user, data);
      setUser(data);
    },
  });

  return {
    loading,
    updateUser,
  };
};
