import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { useParams } from 'react-router-dom';

import { api } from '@/lib/api';

import { PRODUCTS } from '../config/endpoints';
import type { ProductFormState } from '../schema/product-form-schema';
import { getProductsQueryOptions } from './use-products';

export const useSavedProduct = () => {
  const queryClient = useQueryClient();
  const { productId } = useParams();

  return useMutation({
    mutationFn: async (data: ProductFormState) => {
      if (productId) {
        return api.put(PRODUCTS, {
          ...data,
          productId: Number(productId),
        });
      }
      return api.post(PRODUCTS, {
        ...data,
      });
    },
    onSuccess: () => {
      notification.success({
        message: 'Product saved successfully',
      });

      queryClient.invalidateQueries({
        queryKey: getProductsQueryOptions().queryKey,
      });
    },
    onError: () => {
      notification.error({
        message: 'Failed to save product',
      });
    },
  });
};
