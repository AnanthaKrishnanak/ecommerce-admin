import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Button, Result } from 'antd';

import { paths } from '@/config/paths';
import AppLayout from '@/components/layout';
import Products from '@/features/products/route/products';
import Dashboard from '@/features/dashboard/route/dashboard';
import ProductForm from '@/features/products/components/product-form';
import Categories from '@/features/categories/route/categories';

const AppRouter = () => {
  const routes = createBrowserRouter([
    {
      path: paths.dashboard.path,
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: paths.products.path,
          element: <Products />,
        },
        {
          path: paths.products.add.path,
          element: <ProductForm />,
        },
        {
          path: paths.products.edit.path,
          element: <ProductForm />,
        },
        {
          path: paths.categories.path,
          element: <Categories />,
        },
      ],
    },
    {
      path: '*',
      element: (
        <Result
          status="404"
          title="404"
          subTitle="Page you are looking for does not exist."
          extra={
            <Button type="primary" href={paths.dashboard.getHref()}>
              Back Home
            </Button>
          }
        />
      ),
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default AppRouter;
