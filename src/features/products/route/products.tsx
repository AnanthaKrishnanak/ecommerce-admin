import { Button } from 'antd';
import ProductList from '../components/product-list';

const Products = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-end">
        <Button>Add Product</Button>
      </div>
      <ProductList />
    </div>
  );
};

export default Products;
