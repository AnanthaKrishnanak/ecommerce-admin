import { z } from 'zod';

export const productSchema = z.object({
  productId: z.number(),
  productName: z.string(),
  productPrice: z.number(),
  productStock: z.number(),
  productDescription: z.string(),
  productCategory: z.object({
    id: z.number(),
    name: z.string(),
  }),
  inStock: z.boolean(),
  createdAt: z.string(),
  brand: z.string(),
  rating: z.number().min(0).max(5),
  reviewCount: z.number(),
  productImageUrl: z.optional(z.string()),
});

export const productListSchema = z.array(productSchema);

export type Product = z.infer<typeof productSchema>;
