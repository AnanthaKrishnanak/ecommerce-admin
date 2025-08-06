import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api';
import type { QueryConfig } from '@/lib/react-query';

import { CATEGORIES } from '../config/endpoints';
import type { Category } from '../schema/category-schema';

export const getCategories = (): Promise<Category[]> => {
  return api.get(CATEGORIES).then((res) => res.data);
};

export const getCategoriesQueryOptions = () => {
  return queryOptions({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
};

type UseCategoriesOptions = {
  queryConfig?: QueryConfig<typeof getCategoriesQueryOptions>;
};

export const useCategories = ({ queryConfig }: UseCategoriesOptions = {}) => {
  return useQuery({
    ...getCategoriesQueryOptions(),
    ...queryConfig,
  });
};
