'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/app/resumes/components/Sidebar';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <motion.div
        initial={{ x: -320 }}
        animate={{ x: 0 }}
        className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-[320px] lg:flex-col"
      >
        <div className="h-full rounded p-4">
          <Sidebar />
        </div>
      </motion.div>

      <main className="mx-6 my-4 lg:mx-8 lg:pl-[320px]">{children}</main>
    </div>
  );
};

export default Layout;
