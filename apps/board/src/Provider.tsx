import { useBoardStore } from '@/store/board';
import { sampleResume } from '@fe-cookie/resume-generator-shared';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

const Provider = () => {
  const resume = useBoardStore((state) => state.resume);
  const setResume = useBoardStore((state) => state.setResume);

  const handleMessage = (event: MessageEvent) => {
    console.log('handle message', { event }, window.location);
  };

  // useEffect(() => {
  //   window.addEventListener('message', handleMessage);
  //   return () => {
  //     window.removeEventListener('message', handleMessage);
  //   };
  // }, [setResume]);

  useEffect(() => {
    setResume(sampleResume);
  }, [setResume]);

  if (!resume.basics) return null;

  return (
    <ChakraProvider>
      <Outlet />
    </ChakraProvider>
  );
};

export default Provider;
