import type { Metadata } from 'next';
import '../styles/main.css';
// import 'ui/style.css';
import Provider from './Provider';
import '@/utils/dayjs';

export const metadata: Metadata = {
  title: 'Resume Generator',
  description: 'Build your own resume online',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
