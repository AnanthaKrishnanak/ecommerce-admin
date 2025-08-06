import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';

import { api } from '@/lib/api';
import { CATEGORIES } from '../config/endpoints';
import type { CategoryFormState } from '../schema/category-form-schema';
import { getCategoriesQueryOptions } from './use-categories';

export const useSaveCategory = (id?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CategoryFormState) => {
      if (id) {
        return api.put(CATEGORIES, {
          ...data,
          id,
        });
      }
      return api.post(CATEGORIES, {
        ...data,
      });
    },
    onSuccess: () => {
      notification.success({
        message: 'Category saved successfully',
      });

      queryClient.invalidateQueries({
        queryKey: getCategoriesQueryOptions().queryKey,
      });
    },
    onError: () => {
      notification.error({
        message: 'Failed to save category',
      });
    },
  });
};
