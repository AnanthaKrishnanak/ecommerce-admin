import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';

const AppLayout = () => {
  return (
    <Layout>
      <Layout.Sider className="h-svh overflow-y-auto">
        <Sidebar />
      </Layout.Sider>
      <Layout.Content className="h-svh overflow-y-auto p-8">
        {<Outlet />}
      </Layout.Content>
    </Layout>
  );
};

export default AppLayout;
