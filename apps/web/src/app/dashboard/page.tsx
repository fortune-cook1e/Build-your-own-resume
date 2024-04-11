'use client';

import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();

  router.push('/dashboard/resumes');

  return null;
};

export default Dashboard;
