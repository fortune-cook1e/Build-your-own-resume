'use client';

import { useBuilderStore } from '@/store/builder';
import { useResumeStore } from '@/store/resume';
import { POST_MESSAGES } from '@fe-cookie/resume-generator-shared';
import { FC, useCallback, useEffect } from 'react';

const Builder: FC = () => {
  const iframeRef = useBuilderStore((state) => state.iframe.ref);
  const setIFrameRef = useBuilderStore((state) => state.iframe.setRef);
  const resume = useResumeStore((state) => state.resume);

  const updateResumeInIFrame = useCallback(() => {
    if (!iframeRef || !iframeRef.contentWindow) return;
    const message = {
      type: POST_MESSAGES.setResume,
      payload: resume.data,
    };
    iframeRef.contentWindow.postMessage(message, '*');
  }, [iframeRef, resume.data]);

  useEffect(() => {
    if (!iframeRef || !iframeRef?.contentWindow) return;
    iframeRef.addEventListener('load', updateResumeInIFrame);
    return () => {
      iframeRef.removeEventListener('load', updateResumeInIFrame);
    };
  }, [iframeRef, resume.data, updateResumeInIFrame]);

  useEffect(() => {
    updateResumeInIFrame();
  }, [resume.data, updateResumeInIFrame]);

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
