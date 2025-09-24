import { BasketItem, Product } from '../domain/product';
import {
  DeliveryStrategy,
  OfferStrategy,
} from '../domain/types';

export const createBasketService = (
  offers: OfferStrategy[],
  delivery: DeliveryStrategy
) => {
  let items: BasketItem[] = [];

  const add = (product: Product) => {
    const existing = items.find((i) => i.product.code === product.code);
    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({ product, quantity: 1 });
    }
  };

  const total = () => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const discount = offers.reduce((sum, o) => sum + o.apply(items), 0);
    const afterDiscount = subtotal - discount;
    const deliveryCost = delivery.apply(afterDiscount);

    return parseFloat((afterDiscount + deliveryCost).toFixed(2));
  };

  const clear = () => {
    items = [];
  };

  return { add, total, clear, getItems: () => [...items] };
};
