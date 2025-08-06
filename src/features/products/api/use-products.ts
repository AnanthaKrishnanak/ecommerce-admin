import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api';
import type { QueryConfig } from '@/lib/react-query';

import { type Product } from '../schema/product-schema';
import { PRODUCTS } from '../config/endpoints';

export const getProducts = (): Promise<Product[]> => {
  return api.get(PRODUCTS).then((res) => res.data);
};

export const getProductsQueryOptions = () => {
  return queryOptions({
    queryKey: ['products'],
    queryFn: getProducts,
  });
};

type UseProductsOptions = {
  queryConfig?: QueryConfig<typeof getProductsQueryOptions>;
};

export const useProducts = ({ queryConfig }: UseProductsOptions = {}) => {
  return useQuery({
    ...getProductsQueryOptions(),
    ...queryConfig,
  });
};
