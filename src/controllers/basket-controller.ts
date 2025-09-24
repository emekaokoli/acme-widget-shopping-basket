import type { RequestHandler } from 'express';
import type { Basket } from '../domain/basket';
import type { Product } from '../domain/product';
import { addToBasketSchema } from '../validation/basket-schema';

export const createBasketController = (
  basket: Basket,
  catalogue: Product[]
) => {
 const add: RequestHandler = (req, res) => {
   const parsed = addToBasketSchema.safeParse(req.body);
   if (!parsed.success) {
     res.status(400).json(parsed.error);
     return;
   }

   const product = catalogue.find((p) => p.code === parsed.data.productCode);
   if (!product) {
     res.status(404).json({ error: 'Product not found' });
     return;
   }

   basket.add(product);
   res.json({ items: basket.getItems(), total: basket.total() });
 };


  const total: RequestHandler = (_, res) => {
    res.json({ total: basket.total() });
  };

  return { add, total };
};
