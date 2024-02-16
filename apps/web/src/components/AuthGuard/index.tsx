'use client';

import { useUser } from '@/web/apis/user/user';
import { useUserStore } from '@/web/store/user';
import { usePathname, useRouter } from 'next/navigation';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const AuthGuard: FC<Props> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname().replaceAll('/', '');

  const { user, loading } = useUser();

  if (loading) return null;

  if (!user) {
    router.replace(`/login?redirect=${pathname}`);
    return null;
  }

  return children;
};

export default AuthGuard;