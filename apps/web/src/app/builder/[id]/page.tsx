'use client';

import { useResumeStore } from '@/store/resume';
import { FC, useEffect } from 'react';

const Builder: FC = () => {
  const resume = useResumeStore((state) => state.resume);

  useEffect(() => {}, []);

  if (!resume) return null;

  return (
    <iframe
      title={resume.id}
      src="/resume-generator-board/builder"
      className="mt-16 w-screen"
      style={{ height: `calc(100vh - 64px)` }}
    />
  );
};

export default Builder;
