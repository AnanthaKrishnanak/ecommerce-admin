import z from 'zod';

export const categorySchema = z.object({
  name: z.string(),
});

export type CategoryFormState = z.infer<typeof categorySchema>;
