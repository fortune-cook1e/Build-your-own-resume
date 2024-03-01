'use client';

import { QUERY_KEYS } from '@/constants';
import { useUserStore } from '@/store/user';
import { UserEntity } from '@/types/entity/user';
import request from '@/utils/request';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const fetchUser = (): Promise<UserEntity> => request.get('/user/me');

export const useUser = () => {
  const setUser = useUserStore((state) => state.setUser);

  const { isPending: loading, data: user } = useQuery({
    queryKey: [QUERY_KEYS.user],
    queryFn: fetchUser,
  });

  useEffect(() => {
    setUser(user ? user : null);
  }, [setUser, user]);

  return {
    loading,
    user,
  };
};
