import { QUERY_KEYS } from '@/constants';
import { useResumeStore } from '@/store/resume';
import request from '@/utils/request';
import { Resume } from '@fe-cookie/resume-generator-shared';
import { useQuery } from '@tanstack/react-query';

export const getResume = (id: string): Promise<Resume> =>
  request.get(`/resume/${id}`);

export const useResume = (id: string) => {
  const setResume = useResumeStore((state) => state.setResume);

  const { isPending: loading, data: resume } = useQuery({
    queryKey: [QUERY_KEYS.resume.resume, { id }],
    queryFn: async () => {
      const resume = await getResume(id);
      setResume(resume);
      return resume;
    },
  });

  return {
    resume,
    loading,
  };
};
