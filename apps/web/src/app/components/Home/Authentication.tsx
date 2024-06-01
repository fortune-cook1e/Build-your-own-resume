import { useLogout } from '@/apis/auth/logout';
import { useUserStore } from '@/store/user';
import { Button, useToast } from '@chakra-ui/react';
import { House, SignIn, SignOut } from '@phosphor-icons/react';
import Link from 'next/link';

const Authentication = () => {
  const isLogin = useUserStore((state) => !!state.user);
  const { loading, logout } = useLogout();
  const toast = useToast();

  const onLogout = async () => {
    await logout();
    toast({
      title: 'Logout success',
      status: 'success',
      duration: 1000,
      isClosable: true,
      position: 'top',
    });
  };

  if (isLogin) {
    return (
      <div className="flex gap-x-4">
        <Link href="/dashboard" prefetch>
          <Button variant="ghost" leftIcon={<House />}>
            Dashboard
          </Button>
        </Link>
        <Button
          variant="ghost"
          leftIcon={<SignOut />}
          onClick={onLogout}
          isLoading={loading}
        >
          Loggout
        </Button>
      </div>
    );
  }

  return (
    <Link href="/login" prefetch>
      <Button leftIcon={<SignIn />}>Login</Button>
    </Link>
  );
};

export default Authentication;
