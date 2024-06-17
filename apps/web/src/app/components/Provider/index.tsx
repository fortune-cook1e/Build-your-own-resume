'use client';

import { FC } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'ui';
import { queryClient } from '@/utils/queryClient';
import ThemeProvider from '@/app/components/Provider/Theme';
import { useSystemStore } from '@/store/system';

interface Props {
  children: React.ReactNode;
}

const Provider: FC<Props> = ({ children }) => {
  const theme = useSystemStore((state) => state.theme);

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools buttonPosition="top-right" /> */}
      <ThemeProvider
        attribute="class"
        defaultTheme={theme}
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
      <Toaster />
    </QueryClientProvider>
  );
};

export default Provider;
