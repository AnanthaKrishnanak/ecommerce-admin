import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { paths } from '@/config/paths';

const EditProduct = ({ productId }: { productId: number }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(paths.products.edit.getHref(productId.toString()));
  };

  return <Button onClick={handleEditClick} icon={<EditOutlined />} />;
};

export default EditProduct;
