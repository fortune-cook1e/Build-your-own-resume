'use client';

import LoginDiscussImg from '@/web/app/assets/images/login-discuss.png';
import LoginForm from '@/web/app/login/components/LoginForm';
import RegisterForm from '@/web/app/login/components/RegisterForm';
import { Box, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';

export enum LoginMode {
  Login = 'login',
  Register = 'register',
}

const Login = () => {
  const [mode, setMode] = useState<LoginMode>(LoginMode.Login);

  const toggleMode = (mode: LoginMode) => {
    setMode(mode);
  };

  return (
    <Box>
      <Box mb={53} paddingInlineStart={42} paddingTop={31}>
        <h3>Your Logo</h3>
      </Box>

      <Flex paddingLeft={111}>
        <Box
          w={505}
          padding="36px"
          borderRadius="lg"
          borderWidth="1px"
          className="animate-fade-right animate-once"
        >
          <section>
            <h3 className="text-xl mb-[29px]">Welcome!</h3>
            {mode === LoginMode.Login ? (
              <LoginForm
                onRegisterClick={() => toggleMode(LoginMode.Register)}
              />
            ) : (
              <RegisterForm onLoginClick={() => toggleMode(LoginMode.Login)} />
            )}
          </section>
        </Box>

        <Image
          src={LoginDiscussImg}
          alt="team disucss"
          className="animate-fade-left animate-once w-full object-contain"
        />
      </Flex>
    </Box>
  );
};

export default Login;
