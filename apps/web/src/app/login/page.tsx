'use client';

import LoginDiscussImg from '@/assets/images/login-discuss.png';
import LoginForm from '@/app/login/components/LoginForm';
import RegisterForm from '@/app/login/components/RegisterForm';
import Image from 'next/image';
import { useState } from 'react';
import { LoginMode } from '@/app/login/shared';

const Login = () => {
  const [mode, setMode] = useState<LoginMode>(LoginMode.Login);

  const toggleMode = (mode: LoginMode) => {
    setMode(mode);
  };

  return (
    <div className="h-screen">
      {/* <Box mb={53} paddingInlineStart={42} paddingTop={31}>
        <h3>Your Logo</h3>
      </Box> */}

      <div className="h-full flex items-center justify-center animate-fade-right animate-once">
        <section className="w-full max-w-xl p-12 border border-solid rounded-md">
          <h3 className="text-xl mb-[29px]">Welcome!</h3>
          {mode === LoginMode.Login ? (
            <LoginForm onRegisterClick={() => toggleMode(LoginMode.Register)} />
          ) : (
            <RegisterForm onLoginClick={() => toggleMode(LoginMode.Login)} />
          )}
        </section>
      </div>
    </div>
  );
};

export default Login;
