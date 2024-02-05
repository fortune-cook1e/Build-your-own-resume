'use client';

import { login } from '@/web/app/apis/auth.api';
import { Button, useStyleConfig } from '@chakra-ui/react';

export default function Home() {
  const handleLogin = async () => {
    await login({
      identifier: '767077147@qq.com',
      password: 'gaoliang199516',
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button onClick={handleLogin}>click me</Button>
    </main>
  );
}
