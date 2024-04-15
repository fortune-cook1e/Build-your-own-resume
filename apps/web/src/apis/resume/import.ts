import { QUERY_KEYS } from '@/constants';
import { queryClient } from '@/utils/queryClient';
import request from '@/utils/request';
import { ImportResumeDto, Resume } from 'shared';
import { useMutation } from '@tanstack/react-query';

const importResume = (data: ImportResumeDto): Promise<Resume> =>
  request.post('/resume/import', data);

export const useImportResume = () => {
  const { isPending: loading, mutateAsync: importResumeFn } = useMutation({
    mutationFn: importResume,
    onSuccess(data) {
      queryClient.setQueryData<Resume>(
        [QUERY_KEYS.resume, { id: data.id }],
        data,
      );

      queryClient.setQueryData<Resume[]>(QUERY_KEYS.resumeList, (cache) => {
        if (!cache) return [data];
        return [...cache, data];
      });
    },
  });
  return {
    loading,
    importResume: importResumeFn,
  };
};
