import { Button, Form, Input, Modal } from 'antd';
import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import FormItem from 'antd/es/form/FormItem';
import { useSaveCategory } from '../api/use-save-categories';
import type { CategoryFormState } from '../schema/category-form-schema';

interface CategoryFormModalProps {
  name?: string;
  action?: 'create' | 'update';
  id?: number;
}

const CategoryFormModal: React.FC<CategoryFormModalProps> = ({
  name = '',
  action = 'create',
  id,
}) => {
  const categoryMutation = useSaveCategory(id);
  const [open, setOpen] = React.useState(false);
  const [form] = Form.useForm();

  const openModal = () => {
    form.setFieldsValue({ name });
    setOpen(true);
  };
  const closeModal = () => setOpen(false);

  const handleSubmit = (values: CategoryFormState) => {
    categoryMutation.mutate(values, {
      onSuccess: () => {
        closeModal();
      },
    });
  };

  return (
    <>
      {action === 'create' ? (
        <Button type="primary" onClick={openModal}>
          Add Category
        </Button>
      ) : (
        <Button onClick={openModal} icon={<EditOutlined />} />
      )}
      <Modal
        title={action === 'create' ? 'Add Category' : 'Edit Category'}
        open={open}
        onCancel={closeModal}
        okText={action === 'create' ? 'Add' : 'Update'}
        cancelText="Cancel"
        okButtonProps={{ form: 'category-form', htmlType: 'submit' }}
        destroyOnHidden
      >
        <Form
          initialValues={{ name }}
          id="category-form"
          onFinish={handleSubmit}
        >
          <FormItem name="name" rules={[{ required: true }]}>
            <Input placeholder="Category Name" />
          </FormItem>
        </Form>
      </Modal>
    </>
  );
};

export default CategoryFormModal;
