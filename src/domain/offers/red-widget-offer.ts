import type { BasketItem } from '../product';
import type { OfferStrategy } from '../types';

export const redWidgetOffer = (): OfferStrategy => ({
  apply: (items: BasketItem[]) => {
    let discount = 0;
    items.forEach((item) => {
      if (item.product.code === 'R01') {
        const eligiblePairs = Math.floor(item.quantity / 2);
        discount += eligiblePairs * (item.product.price / 2);
      }
    });
    return discount;
  },
});
