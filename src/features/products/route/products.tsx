import { Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';

import ProductList from '../components/product-list';
import { paths } from '@/config/paths';

const Products = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <div className="flex flex-col gap-8">
        <div className="flex justify-end">
          <Button
            type="primary"
            onClick={() => navigate(paths.products.add.getHref())}
          >
            Add Product
          </Button>
        </div>
        <ProductList />
      </div>
    </Card>
  );
};

export default Products;
