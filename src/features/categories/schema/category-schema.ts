import z from 'zod';

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
});

export const categoryListSchema = z.array(categorySchema);

export type Category = z.infer<typeof categorySchema>;
