import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Button, Result } from 'antd';

import { paths } from '@/config/paths';
import AppLayout from '@/components/layout';
import Products from '@/features/products/route/products';
import Dashboard from '@/features/dashboard/route/dashboard';

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
          path: paths.categories.path,
          element: <div>Categories</div>,
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
