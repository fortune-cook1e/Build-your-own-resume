'use client';

import { useResumeStore } from '@/store/resume';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

const ReactJsonView = dynamic(() => import('react-json-view'));

const Builder = () => {
  const searchParams = useSearchParams();
  // const resume = useResumeStore((state) => state.resume);
  // console.log({ resume });

  // FixBug: nextjs Text content does not match server-rendered HTML
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <div>
      <h1>this is builder page</h1>

      <div>{/* <ReactJsonView src={resume.data.sections} /> */}</div>
    </div>
  );
};

export default Builder;
