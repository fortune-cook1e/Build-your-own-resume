import { useLogout } from '@/apis/auth/logout';
import { useUserStore } from '@/store/user';
import { Button, CoolMode, useToast } from 'ui';
import { House, SignIn, SignOut } from '@phosphor-icons/react';
import Link from 'next/link';

const Authentication = () => {
  const isLogin = useUserStore((state) => !!state.user);
  const { loading, logout } = useLogout();
  const { toast } = useToast();

  const onLogout = async () => {
    await logout();
    toast({
      title: 'Logout success',
      variant: 'success',
      description: 'You have been successfully logged out.',
      duration: 2000,
    });
  };

  if (isLogin) {
    return (
      <div className="flex gap-x-4">
        <Link href="/dashboard" prefetch>
          <CoolMode>
            <Button leftIcon={<House />}>Dashboard</Button>
          </CoolMode>
        </Link>
        <CoolMode>
          <Button onClick={onLogout} loading={loading} leftIcon={<SignOut />}>
            Loggout
          </Button>
        </CoolMode>
      </div>
    );
  }

  return (
    <Link href="/auth/login" prefetch>
      <CoolMode>
        <Button leftIcon={<SignIn />}>Login</Button>
      </CoolMode>
    </Link>
  );
};

export default Authentication;
