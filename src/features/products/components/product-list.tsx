import { Flex, Image, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useProducts } from '../api/use-products';
import type { Product } from '../schema/product-schema';
import DeleteProduct from './delete-product';
import EditProduct from './edit-product';

const ProductList = () => {
  const { data = [], isLoading } = useProducts();

  const columns: ColumnsType<Product> = [
    {
      title: 'Name',
      dataIndex: 'productName',
      render: (name, record) => (
        <Flex gap={8} align="center">
          <Image src={record.productImageUrl} width={25} height={25} />
          <span>{name}</span>
        </Flex>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'productPrice',
      render: (price) => <span>${price}</span>,
    },
    { title: 'brand', dataIndex: 'brand' },
    { title: 'category', dataIndex: 'productCategory' },
    { title: 'stock', dataIndex: 'productStock' },
    { title: 'rating', dataIndex: 'rating' },
    {
      title: 'Action',
      render: (_, record) => (
        <Flex gap={8}>
          <EditProduct productId={record.productId} />
          <DeleteProduct productId={record.productId} />
        </Flex>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={isLoading}
      scroll={{x:'fit-content'}}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default ProductList;
