import { QUERY_KEYS } from '@/constants';
import { queryClient } from '@/utils/queryClient';
import request from '@/utils/request';
import { Resume } from '@fe-cookie/resume-generator-shared';
import { useMutation } from '@tanstack/react-query';

const deleteResume = (id: string): Promise<null> =>
  request.post('/resume', { id });

export const useDeleteResume = (id: string) => {
  const { isPending: loading, mutateAsync: delteResumeFn } = useMutation({
    mutationFn: () => deleteResume(id),
    onSuccess() {
      queryClient.removeQueries({ queryKey: [QUERY_KEYS.resume, id] });

      queryClient.setQueryData<Resume[]>(QUERY_KEYS.resumeList, (cache) => {
        if (!cache) return [];
        return cache.filter((resume) => resume.id !== id);
      });
    },
  });

  return {
    deleteResume: delteResumeFn,
    loading,
  };
};
