import { useEffect, useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Button,
  Upload,
  message,
  Card,
  Flex,
  Spin,
  Typography,
} from 'antd';
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';

import { useUploadImage } from '../api/use-image-upload';
import { useSavedProduct } from '../api/use-save-product';
import { useCategories } from '@/features/categories/api/use-categories';
import type { ProductFormState } from '../schema/product-form-schema';
import { paths } from '@/config/paths';
import { useProduct } from '../api/use-product';

const { TextArea } = Input;

const brands = ['Sony', 'Samsung', 'Apple', 'Nike', 'Adidas'];

const ProductForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>();
  const { productId } = useParams();

  const productQuery = useProduct({
    productId: Number(productId),
  });

  const uploadImage = useUploadImage();
  const submitProduct = useSavedProduct();
  const categoriesQuery = useCategories();

  const handleFinish = (values: ProductFormState) => {
    submitProduct.mutate(
      {
        ...values,
        productImageUrl: imagePreviewUrl!,
      },
      {
        onSuccess: () => {
          message.success('Product saved successfully');
          navigate(paths.products.getHref());
        },
      },
    );
  };

  const isEditMode = !!productQuery.data && !!productId;

  useEffect(() => {
    if (productQuery.data) {
      form.setFieldsValue({
        ...productQuery.data,
        categoryId: productQuery.data.productCategory?.id,
      });
      setImagePreviewUrl(productQuery.data.productImageUrl);
    }
  }, [productQuery.data, form]);

  if (productQuery.isLoading) {
    return (
      <Flex justify="center" align="center" className="h-svh w-full">
        <Spin size="large" />
      </Flex>
    );
  }

  return (
    <Card
      title={
        <Flex align="center" justify="space-between" gap={8}>
          <Typography.Title level={4}>
            {isEditMode ? 'Edit Product' : 'Add Product'}
          </Typography.Title>
          <Button icon={<CloseOutlined />} onClick={() => navigate(-1)} />
        </Flex>
      }
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        initialValues={{
          productPrice: 0,
          productStock: 0,
          inStock: true,
          rating: 0,
          reviewCount: 0,
        }}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Product Name"
          name="productName"
          rules={[{ required: true, message: 'Product name is required' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Product Image">
          <Upload
            name="file"
            showUploadList={false}
            accept="image/*"
            customRequest={async ({ file, onSuccess, onError }) => {
              try {
                const url = await uploadImage.mutateAsync(file as File);
                form.setFieldsValue({ productImageUrl: url.data });
                setImagePreviewUrl(url.data);
                onSuccess?.('ok');
                message.success('Image uploaded');
              } catch {
                onError?.(new Error('Upload failed'));
                message.error('Image upload failed');
              }
            }}
          >
            <Button icon={<UploadOutlined />} loading={uploadImage.isPending}>
              Upload Image
            </Button>
          </Upload>
          {imagePreviewUrl && (
            <div style={{ marginTop: 10 }}>
              <img src={imagePreviewUrl} alt="preview" style={{ width: 100 }} />
            </div>
          )}
        </Form.Item>
        <Form.Item
          label="Product Price"
          name="productPrice"
          rules={[{ required: true, message: 'Price is required' }]}
        >
          <InputNumber
            min={0}
            style={{ width: '100%' }}
            placeholder="Enter product price"
          />
        </Form.Item>

        <Form.Item
          label="Stock"
          name="productStock"
          rules={[{ required: true, message: 'Stock is required' }]}
        >
          <InputNumber
            min={0}
            style={{ width: '100%' }}
            placeholder="Enter product stock"
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="productDescription"
          rules={[{ required: true, message: 'Description is required' }]}
        >
          <TextArea rows={3} placeholder="Enter product description" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="categoryId"
          rules={[{ required: true, message: 'Category is required' }]}
        >
          <Select
            options={categoriesQuery.data?.map((c) => ({
              label: c.name,
              value: c.id,
            }))}
            placeholder="Select a category"
          />
        </Form.Item>

        <Form.Item
          label="Brand"
          name="brand"
          rules={[{ required: true, message: 'Brand is required' }]}
        >
          <Select
            options={brands.map((b) => ({ label: b, value: b }))}
            placeholder="Select a brand"
          />
        </Form.Item>
        <Form.Item
          label="Rating"
          name="rating"
          rules={[{ required: true, message: 'Rating is required' }]}
        >
          <InputNumber
            min={0}
            max={5}
            style={{ width: '100%' }}
            placeholder="Enter rating"
          />
        </Form.Item>

        <Form.Item
          label="Review Count"
          name="reviewCount"
          rules={[{ required: true, message: 'Review count is required' }]}
        >
          <InputNumber
            min={0}
            style={{ width: '100%' }}
            placeholder="Enter review count"
          />
        </Form.Item>

        <Form.Item label="In Stock" name="inStock" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={submitProduct.isPending}
          >
            {isEditMode ? 'Update Product' : 'Create Product'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProductForm;
