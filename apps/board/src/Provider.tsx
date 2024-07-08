import { useBoardStore } from '@/store/board';
import { POST_MESSAGES } from 'shared';
import { useCallback, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster, TooltipProvider } from 'ui';

const Provider = () => {
  const resume = useBoardStore((state) => state.resume);
  const setResume = useBoardStore((state) => state.setResume);

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const { type, payload } = event.data;
      if (type === POST_MESSAGES.setResume && payload) {
        setResume(payload);
      }
    },
    [setResume],
  );

  useEffect(() => {
    // for print
    const resumeData = window.localStorage.getItem('resume');
    if (resumeData) return setResume(JSON.parse(resumeData));

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [setResume, handleMessage]);

  // Tip: for testing
  // useEffect(() => {
  //   setResume(sampleResume);
  // }, [setResume]);

  if (!resume.basics) return null;

  return (
    <TooltipProvider>
      <Outlet />
      <Toaster />
    </TooltipProvider>
  );
};

export default Provider;
