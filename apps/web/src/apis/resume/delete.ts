import { QUERY_KEYS } from '@/constants';
import { queryClient } from '@/utils/queryClient';
import request from '@/utils/request';
import { Resume } from '@fe-cookie/resume-generator-shared';
import { useMutation } from '@tanstack/react-query';

const deleteResume = (id: string): Promise<Resume> =>
  request.post('/resume/delete', { id });

export const useDeleteResume = () => {
  const { isPending: loading, mutateAsync: delteResumeFn } = useMutation({
    mutationFn: deleteResume,
    onSuccess(data) {
      queryClient.removeQueries({
        queryKey: [QUERY_KEYS.resume, { id: data.id }],
      });

      queryClient.setQueryData<Resume[]>(QUERY_KEYS.resumeList, (cache) => {
        if (!cache) return [];
        return cache.filter((resume) => resume.id !== data.id);
      });
    },
  });

  return {
    deleteResume: delteResumeFn,
    loading,
  };
};
