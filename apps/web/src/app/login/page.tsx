'use client';

import LoginDiscussImg from '@/assets/images/login-discuss.png';
import LoginForm from '@/app/login/components/LoginForm';
import RegisterForm from '@/app/login/components/RegisterForm';
import { Box, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';
import { LoginMode } from '@/app/login/shared';

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
          padding="36px"
          borderRadius="lg"
          borderWidth="1px"
          className="animate-fade-right animate-once min-w-[505px]"
        >
          <section className="w-full">
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
