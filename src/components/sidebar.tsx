import { Menu, Typography, type MenuProps } from 'antd';
import {
  ProductOutlined,
  AppstoreAddOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { paths } from '@/config/paths';

const menuItems: MenuProps['items'] = [
  {
    label: 'Dashboard',
    key: 'dashboard',
    icon: <DashboardOutlined />,
  },
  {
    label: 'Products',
    key: 'products',
    icon: <ProductOutlined />,
  },
  {
    label: 'Categories',
    key: 'categories',
    icon: <AppstoreAddOutlined />,
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    navigate(paths[key as keyof typeof paths].path);
  };

  return (
    <>
      <div className="px-8 py-4">
        <Typography.Title
          level={3}
          className="!text-white cursor-pointer"
          onClick={() => navigate(paths.dashboard.path)}
        >
          ADMIN
        </Typography.Title>
      </div>
      <Menu
        mode="inline"
        items={menuItems}
        theme="dark"
        defaultSelectedKeys={['dashboard']}
        onClick={handleMenuClick}
      />
    </>
  );
};

export default Sidebar;
