'use client';

import { useUserStore } from '@/web/store/user';
import { usePathname, useRouter } from 'next/navigation';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const AuthGuard = ({ children }: Props) => {
  const router = useRouter();
  const pathname = usePathname().replaceAll('/', '');

  const user = useUserStore((state) => state.user);

  if (user) return children;

  return router.replace(`/login?redirect=${pathname}`);
};

export default AuthGuard;
