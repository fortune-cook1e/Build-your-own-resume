import { QUERY_KEYS } from '@/constants';
import { queryClient } from '@/utils/queryClient';
import request from '@/utils/request';
import { Resume, UpdateResumeDto } from 'shared';
import { useMutation } from '@tanstack/react-query';
import { debounce } from 'lodash-es';

const updateResume = async (data: UpdateResumeDto): Promise<Resume> => {
  const res = (await request.post('/resume/update', data)) as Resume;
  queryClient.setQueryData<Resume>([QUERY_KEYS.resume, { id: res.id }], res);

  queryClient.setQueryData<Resume[]>(QUERY_KEYS.resumeList, (cache) => {
    if (!cache) return [res];
    return cache.map((item) => (item.id === res.id ? res : item));
  });

  return res;
};
export const useUpdateResume = () => {
  const { isPending: loading, mutateAsync: updateResumeFn } = useMutation({
    mutationFn: updateResume,
  });

  return {
    loading,
    updateResume: updateResumeFn,
  };
};

export const debounceUpdateResume = debounce(updateResume, 300);
