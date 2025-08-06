import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api';
import type { QueryConfig } from '@/lib/react-query';

import { type Product } from '../schema/product-schema';
import { PRODUCTS } from '../config/endpoints';

export const getProduct = ({
  productId,
}: {
  productId: number;
}): Promise<Product> => {
  return api.get(`${PRODUCTS}${productId}/`).then((res) => res.data);
};

export const getProductQueryOptions = ({
  productId,
}: {
  productId?: number;
}) => {
  return queryOptions({
    queryKey: ['product', productId],
    queryFn: () => getProduct({ productId: Number(productId) }),
    enabled: !!productId,
  });
};

type UseProductOptions = {
  productId?: number;
  queryConfig?: QueryConfig<typeof getProductQueryOptions>;
};

export const useProduct = ({ queryConfig, productId }: UseProductOptions) => {
  return useQuery({
    ...getProductQueryOptions({ productId }),
    ...queryConfig,
  });
};
