import { QUERY_KEYS } from '@/constants';
import { queryClient } from '@/utils/queryClient';
import request from '@/utils/request';
import { CreateResumeDto, Resume } from '@fe-cookie/resume-generator-shared';
import { useMutation } from '@tanstack/react-query';

const createResume = async (data: CreateResumeDto): Promise<Resume> =>
  request.post('/resume/create', data);

export const useCreateResume = () => {
  const { mutateAsync: createResumeFn, isPending: loading } = useMutation({
    mutationFn: createResume,
    onSuccess(data) {
      queryClient.setQueryData<Resume>(['resume', { id: data.id }], data);

      queryClient.setQueryData<Resume[]>(QUERY_KEYS.resumeList, (cache) => {
        if (!cache) return [data];
        return [...cache, data];
      });
    },
  });

  return {
    createResume: createResumeFn,
    loading,
  };
};
