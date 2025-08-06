import { Card } from 'antd';
import CategoryFormModal from '../components/category-form-modal';
import CategoryList from '../components/category-list';

const Categories = () => {
  return (
    <Card>
      <div className="flex flex-col gap-8">
        <div className="flex justify-end">
          <CategoryFormModal action="create" />
        </div>
        <CategoryList />
      </div>
    </Card>
  );
};

export default Categories;
