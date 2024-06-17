'use client';

import { useVerifyEmail } from '@/apis/auth/verify-email';
import { Alert, AlertTitle, AlertDescription, Button, useToast } from 'ui';
import { ArrowRight, Info } from '@phosphor-icons/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const VerifyEmailPage = () => {
  const params = useSearchParams();
  const token = params.get('token');
  const { verifyEmail } = useVerifyEmail();
  const { toast } = useToast();

  const handleVerifyEmail = async (token: string) => {
    await verifyEmail(token);
    toast({
      title: 'Email verified successfully',
      description: 'You can now go to your dashboard',
      status: 'success',
    });
  };

  useEffect(() => {
    if (!token) return;
    handleVerifyEmail(token);
  }, [token]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Verify your email address
        </h2>
        <p className="leading-relaxed opacity-75">
          You should have received an email from{' '}
          <strong>Resume Generator</strong> with a link to verify your account.
        </p>
      </div>

      <Alert variant="info">
        <Info size={18} />
        <AlertTitle>
          Please note that this step is completely optional.
        </AlertTitle>
        <AlertDescription>
          We verify your email address only to ensure that we can send you a
          password reset link in case you forget your password.
        </AlertDescription>
      </Alert>

      <Link href="/dashboard" prefetch>
        <Button leftIcon={<ArrowRight />}>Go to Dashboard</Button>
      </Link>
    </div>
  );
};

export default VerifyEmailPage;
