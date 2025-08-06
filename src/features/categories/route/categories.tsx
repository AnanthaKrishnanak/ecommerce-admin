import CategoryFormModal from '../components/category-form-modal';
import CategoryList from '../components/category-list';

const Categories = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-end">
        <CategoryFormModal action="create" />
      </div>
      <CategoryList />
    </div>
  );
};

export default Categories;
