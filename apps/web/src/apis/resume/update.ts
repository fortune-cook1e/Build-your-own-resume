import { QUERY_KEYS } from '@/constants';
import { queryClient } from '@/utils/queryClient';
import request from '@/utils/request';
import { Resume, UpdateResumeDto } from '@fe-cookie/resume-generator-shared';
import { useMutation } from '@tanstack/react-query';
import { debounce } from 'lodash-es';

const updateResume = async (data: UpdateResumeDto): Promise<Resume> => {
  const res = (await request.post('/resume/update', data)) as Resume;
  queryClient.setQueryData<Resume>(['resume', { id: res.id }], res);
  return res;
};
export const useUpdateResume = () => {
  const { isPending: loading, mutateAsync: updateResumeFn } = useMutation({
    mutationFn: updateResume,
    onSuccess: (data) => {
      queryClient.setQueryData<Resume>(
        [QUERY_KEYS.resume, { id: data.id }],
        data,
      );

      queryClient.setQueryData<Resume[]>(QUERY_KEYS.resumeList, (cache) => {
        if (!cache) return [data];
        return cache.map((item) => (item.id === data.id ? data : item));
      });
    },
  });

  return {
    loading,
    updateResume: updateResumeFn,
  };
};

export const debounceUpdateResume = debounce(updateResume, 300);
