import type { Metadata } from 'next';
import '../styles/main.css';
import Provider from './Provider';
import NextTopLoader from 'nextjs-toploader';

import '@/utils/dayjs';

export const metadata: Metadata = {
  title: 'Resume Generator',
  description: 'Build your own resumes online',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextTopLoader />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
