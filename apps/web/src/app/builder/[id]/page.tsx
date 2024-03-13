'use client';

import { useBuilderStore } from '@/store/builder';
import { useResumeStore } from '@/store/resume';
import { FC, useEffect } from 'react';

const Builder: FC = () => {
  const iframeRef = useBuilderStore((state) => state.iframe.ref);
  const setIFrameRef = useBuilderStore((state) => state.iframe.setRef);
  const resume = useResumeStore((state) => state.resume);

  useEffect(() => {
    if (!iframeRef || !iframeRef?.contentWindow) return;
    const message = {
      type: 'SET_RESUME',
      payload: resume.data,
    };
    console.log({ iframeRef });
    iframeRef.contentWindow.postMessage(message, '*');
  }, [iframeRef, resume.data]);

  if (!resume) return null;

  return (
    <iframe
      ref={setIFrameRef}
      title={resume.id}
      src="/resume-generator-board/builder"
      className="mt-16 w-screen"
      style={{ height: `calc(100vh - 64px)` }}
    />
  );
};

export default Builder;
