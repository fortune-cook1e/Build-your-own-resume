import { QUERY_KEYS } from '@/constants';
import request from '@/utils/request';
import { Resume } from 'shared';
import { useQuery } from '@tanstack/react-query';

export const getResumeList = (): Promise<Resume[]> =>
  request.get('/resume/list');

export const useResumeList = () => {
  const { isPending: loading, data: resumeList } = useQuery({
    queryKey: QUERY_KEYS.resumeList,
    queryFn: getResumeList,
  });

  return {
    resumeList,
    loading,
  };
};
