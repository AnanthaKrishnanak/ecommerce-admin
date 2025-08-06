import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api';
import { CATEGORIES } from '../config/endpoints';
import { notification } from 'antd';
import { getCategoriesQueryOptions } from './use-categories';

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: number): Promise<string> => {
      return await api.delete(`${CATEGORIES}${productId}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getCategoriesQueryOptions().queryKey,
      });
      notification.success({
        message: 'Category deleted successfully',
      });
    },
    onError: () => {
      notification.error({
        message: 'Failed to delete category',
      });
    },
  });
};
