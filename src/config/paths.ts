export const paths = {
  dashboard: {
    path: '/',
    getHref: () => '/',
  },
  products: {
    path: '/products',
    getHref: () => '/products',
  },
  categories: {
    path: '/categories',
    getHref: () => '/categories',
  },
} as const;
