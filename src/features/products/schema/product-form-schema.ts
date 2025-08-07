import { z } from 'zod';

export const productFormSchema = z.object({
  productName: z.string(),
  productPrice: z.number(),
  productStock: z.number(),
  productDescription: z.string(),
  categoryId: z.number(),
  inStock: z.boolean(),
  brand: z.string(),
  rating: z.number().min(0).max(5),
  reviewCount: z.number(),
  productImageUrl: z.optional(z.string()),
  tags: z.array(z.string()),
});

export type ProductFormState = z.infer<typeof productFormSchema>;
