export const paths = {
  dashboard: {
    path: '/',
    getHref: () => '/',
  },
  products: {
    path: '/products',
    getHref: () => '/products',
    add: {
      path: '/products/add',
      getHref: () => '/products/add',
    },
    edit: {
      path: '/products/edit/:productId',
      getHref: (productId: string) => `/products/edit/${productId}`,
    },
  },

  categories: {
    path: '/categories',
    getHref: () => '/categories',
  },
} as const;
