import request from '@/utils/request';
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { Resume } from 'shared';

const printResume = (data: Resume): Promise<{ url: string }> =>
  request.post('/resume/print', data);

export const usePrintResume = () => {
  const toast = useToast();
  const { isPending: loading, mutateAsync: printResumeFn } = useMutation({
    mutationFn: printResume,
    onSuccess() {
      toast({
        title: 'Print resume success!',
      });
    },
  });
  return {
    loading,
    printResume: printResumeFn,
  };
};
