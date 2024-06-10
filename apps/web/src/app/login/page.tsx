'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'ui';
import LoginForm from '@/app/login/LoginForm';
import RegisterForm from '@/app/login/RegisterForm';
import HeaderToolsBar from '@/components/HeaderToolsBar';

const Login = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const isLoginMode = mode === 'login';

  return (
    <div className="relative">
      <HeaderToolsBar />

      <div className="flex h-screen w-full items-center justify-center dark:bg-background">
        <Card className="w-1/3">
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>
              Please {isLoginMode ? 'sign in' : 'sign up'} resume generator
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            {isLoginMode ? <LoginForm /> : <RegisterForm />}
          </CardContent>
          <CardFooter>
            <div className="w-full text-center">
              {isLoginMode ? (
                <p className="text-[#7D7D7D]">
                  Don’t have an Account ?
                  <span
                    className="ml-2 cursor-pointer text-foreground"
                    onClick={() => setMode('register')}
                  >
                    Register
                  </span>
                </p>
              ) : (
                <p className="text-[#7D7D7D]">
                  Already have an Account ?
                  <span
                    className="ml-2 cursor-pointer text-foreground"
                    onClick={() => setMode('login')}
                  >
                    Login
                  </span>
                </p>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
