'use client';

import AccountSetting from '@/app/dashboard/setting/components/AccountSetting';
import AuthGuard from '@/components/AuthGuard';
import { Divider } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const Setting = () => {
  return (
    <AuthGuard>
      <div className="max-w-2xl space-y-4">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-bold tracking-tight"
        >
          Settings
        </motion.h1>

        <div className="h-[calc(100vh-140px)] lg:h-[calc(100vh-88px)]">
          <div className="space-y-6">
            <AccountSetting />
            <Divider />
            {/* <AccountSettings />
          <Separator />
          <SecuritySettings />
          <Separator />
          <ProfileSettings />
          <Separator />
          <OpenAISettings />
          <Separator />
          <DangerZoneSettings /> */}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Setting;
