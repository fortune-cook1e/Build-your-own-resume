'use client';

import { useResumeStore } from '@/store/resume';
import { useEffect, useState } from 'react';
import ReactJson from 'react-json-view';

const Builder = () => {
  const resume = useResumeStore((state) => state.resume);
  console.log({ resume });

  // FixBug: nextjs Text content does not match server-rendered HTML
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <div>
      <h1>this is builder page</h1>

      <div>
        <ReactJson src={resume.data.sections} />
      </div>
    </div>
  );
};

export default Builder;
