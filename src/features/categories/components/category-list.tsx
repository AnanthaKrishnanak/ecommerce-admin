import type { ColumnsType } from 'antd/es/table';
import type { Category } from '../schema/category-schema';
import Table from 'antd/es/table';
import { useCategories } from '../api/use-categories';
import CategoryFormModal from './category-form-modal';
import DeleteCategory from './delete-category';
import { Flex } from 'antd';

const CategoryList = () => {
  const { data = [], isLoading } = useCategories();

  const columns: ColumnsType<Category> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Action',
      width: 200,
      render: (_, record) => (
        <Flex gap={8}>
          <CategoryFormModal
            name={record.name}
            action="update"
            id={record.id}
          />
          <DeleteCategory productId={record.id} />
        </Flex>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={isLoading}
      pagination={{
        pageSize: 10,
        hideOnSinglePage: true,
      }}
    />
  );
};

export default CategoryList;
