import { Button, Modal } from 'antd';
import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useDeleteCategory } from '../api/use-delete-category';

const DeleteCategory = ({ productId }: { productId: number }) => {
  const [open, setOpen] = React.useState(false);
  const deleteMutation = useDeleteCategory();

  return (
    <>
      <Button icon={<DeleteOutlined />} onClick={() => setOpen(true)} />
      <Modal
        title="Delete Category"
        open={open}
        onOk={() => {
          deleteMutation.mutate(productId, {
            onSuccess: () => {
              setOpen(false);
            },
          });
        }}
        onCancel={() => setOpen(false)}
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this category?</p>
      </Modal>
    </>
  );
};

export default DeleteCategory;
