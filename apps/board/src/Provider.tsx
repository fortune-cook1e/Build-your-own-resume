import { useBoardStore } from '@/store/board';
import {
  POST_MESSAGES,
  // sampleResume,
} from '@fe-cookie/resume-generator-shared';
import { useCallback, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

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
    <ChakraProvider>
      <Outlet />
    </ChakraProvider>
  );
};

export default Provider;
