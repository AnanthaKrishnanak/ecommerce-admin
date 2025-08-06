import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api';
import { PRODUCTS } from '../config/endpoints';
import { notification } from 'antd';
import { getProductsQueryOptions } from './use-products';

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: number): Promise<string> => {
      return await api.delete(`${PRODUCTS}${productId}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getProductsQueryOptions().queryKey,
      });
      notification.success({
        message: 'Product deleted successfully',
      });
    },
    onError: () => {
      notification.error({
        message: 'Failed to delete product',
      });
    },
  });
};
