import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';

import { api } from '@/lib/api';

export const useUploadImage = () => {
  return useMutation({
    mutationFn: async (file: File): Promise<{ data: string }> => {
      const formData = new FormData();
      formData.append('file', file);

      return await api.post('image-upload/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: () => {
      notification.success({
        message: 'Image uploaded successfully',
      });
    },
    onError: () => {
      notification.error({
        message: 'Failed to upload image',
      });
    },
  });
};
