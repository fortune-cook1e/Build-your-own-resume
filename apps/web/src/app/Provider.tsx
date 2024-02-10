'use client';

import { FC } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './utils/queryClient';

interface Props {
  children: React.ReactNode;
}

const Provider: FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools buttonPosition="top-right" />
      <ChakraProvider toastOptions={{ defaultOptions: { position: 'top' } }}>
        {children}
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default Provider;
