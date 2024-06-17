'use client';

import { FC } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '../utils/queryClient';
import { Toaster, TooltipProvider } from 'ui';

interface Props {
  children: React.ReactNode;
}

const Provider: FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools buttonPosition="top-right" /> */}
      <TooltipProvider>{children}</TooltipProvider>
      <Toaster />
    </QueryClientProvider>
  );
};

export default Provider;
