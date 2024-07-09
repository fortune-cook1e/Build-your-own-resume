import { QUERY_KEYS } from '@/constants';
import { useResumeStore } from '@/store/resume';
import request from '@/utils/request';
import { Resume } from 'shared';
import { useQuery } from '@tanstack/react-query';

export const getPreviewResume = (id: string): Promise<Resume> =>
  request.get(`/resume/preview/${id}`);

export const usePreviewResume = (id: string) => {
  const setResume = useResumeStore((state) => state.setResume);

  const { isPending: loading, data: resume } = useQuery({
    queryKey: [QUERY_KEYS.resume, { id }],
    queryFn: async () => {
      const resume = await getPreviewResume(id);
      setResume(resume);
      return resume;
    },
  });

  return {
    resume,
    loading,
  };
};
