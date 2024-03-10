'use client';

import { QUERY_KEYS } from '@/constants';
import { useUserStore } from '@/store/user';
import { User } from '@fe-cookie/resume-generator-shared';
import request from '@/utils/request';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const fetchUser = (): Promise<User> => request.get('/user/me');

export const useUser = () => {
  const setUser = useUserStore((state) => state.setUser);

  const { isPending: loading, data: user } = useQuery({
    queryKey: QUERY_KEYS.user,
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
