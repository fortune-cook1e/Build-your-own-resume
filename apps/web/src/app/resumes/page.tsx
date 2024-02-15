'use client';

import AuthGuard from '@/web/components/AuthGuard';
import { useUserStore } from '@/web/store/user';

const Resumes = () => {
  return <AuthGuard>this is resumes</AuthGuard>;
};

export default Resumes;
