import { QUERY_KEYS } from '@/constants';
import { useUserStore } from '@/store/user';
import request from '@/utils/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const logout = (): Promise<string> => request.post('/auth/logout');

export const useLogout = () => {
  const queryClient = useQueryClient();
  const setUser = useUserStore((state) => state.setUser);

  const { isPending: loading, mutateAsync: logoutFn } = useMutation({
    mutationFn: logout,
    onSuccess() {
      setUser(null);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user });
    },
  });

  return {
    loading,
    logout: logoutFn,
  };
};
