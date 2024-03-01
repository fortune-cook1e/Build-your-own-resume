'use client';

import AuthGuard from '@/components/AuthGuard';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const Resumes = () => {
  const router = useRouter();
  return (
    <AuthGuard>
      this is resumes
      <Button onClick={() => router.push('/builder')}>go to builder</Button>
    </AuthGuard>
  );
};

export default Resumes;
