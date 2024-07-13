'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import AuthGuard from '@/components/AuthGuard';
import Sidebar from '@/app/dashboard/components/Sidebar';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthGuard>
      <motion.div
        initial={{ x: -320 }}
        animate={{ x: 0 }}
        className="hidden bg-background lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-[320px] lg:flex-col"
      >
        <div className="h-full rounded p-4">
          <Sidebar />
        </div>
      </motion.div>

      <main className="mx-6 my-4 bg-background lg:mx-8 lg:pl-[320px]">
        {children}
      </main>
    </AuthGuard>
  );
};

export default Layout;
