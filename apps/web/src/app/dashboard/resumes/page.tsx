'use client';

import { useResumeList } from '@/apis/resume/list';
import AddResumeCard from '@/app/dashboard/resumes/components/AddResumeCard';
import ResumeCard from '@/app/dashboard/resumes/components/ResumeCard';
import AuthGuard from '@/components/AuthGuard';
import { AnimatePresence, motion } from 'framer-motion';

const Resumes = () => {
  const { loading, resumeList } = useResumeList();

  return (
    <AuthGuard>
      <div className="grid grid-cols-3 gap-8 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        <AddResumeCard />

        {resumeList && (
          <AnimatePresence>
            {resumeList.map((resume, index) => (
              <motion.div
                layout
                key={resume.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { delay: (index + 2) * 0.1 },
                }}
                exit={{
                  opacity: 0,
                  filter: 'blur(8px)',
                  transition: { duration: 0.5 },
                }}
              >
                <ResumeCard resume={resume} />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </AuthGuard>
  );
};

export default Resumes;
