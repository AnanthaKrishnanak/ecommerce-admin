import { Button, Modal } from 'antd';
import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useDeleteProduct } from '../api/use-delete-product';

const DeleteProduct = ({ productId }: { productId: number }) => {
  const [open, setOpen] = React.useState(false);
  const deleteMutation = useDeleteProduct();

  return (
    <>
      <Button icon={<DeleteOutlined />} onClick={() => setOpen(true)} />
      <Modal
        title="Delete Product"
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
        <p>Are you sure you want to delete this product?</p>
      </Modal>
    </>
  );
};

export default DeleteProduct;
