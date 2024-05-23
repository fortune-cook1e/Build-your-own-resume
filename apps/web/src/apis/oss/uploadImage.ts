import request from '@/utils/request';
import { useMutation } from '@tanstack/react-query';

const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  return request.post('/oss/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const useUploadImage = () => {
  const { isPending: loading, mutateAsync: uploadImageFn } = useMutation({
    mutationFn: uploadImage,
  });

  return {
    loading,
    uploadImage: uploadImageFn,
  };
};
