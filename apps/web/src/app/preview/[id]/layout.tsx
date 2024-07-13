'use client';

import { usePreviewResume } from '@/apis/resume/preview';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FC, ReactNode } from 'react';
import { Button, CoolMode } from 'ui';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const params = useParams<{ id: string }>();
  const { resume, loading, error } = usePreviewResume(params.id);

  if (loading) return 'loading....';

  if (!resume && error) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <h1>The resume is private, so you cannot check it.</h1>
        <p>Please return to Home page</p>
        <CoolMode>
          <Link href="/" className="block">
            <Button>Home</Button>
          </Link>
        </CoolMode>
      </div>
    );
  }

  return <div>{children}</div>;
};

export default Layout;
