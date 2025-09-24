import { z } from 'zod';

export const addToBasketSchema = z.object({
  productCode: z.string().min(2),
});

export type AddToBasketInput = z.infer<typeof addToBasketSchema>;
