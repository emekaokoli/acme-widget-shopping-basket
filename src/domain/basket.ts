import type { BasketItem, Product } from './product';
import type { DeliveryStrategy, OfferStrategy } from './types';

export class Basket {
  private items: BasketItem[] = [];

  constructor(
    private readonly offers: OfferStrategy[],
    private readonly delivery: DeliveryStrategy
  ) {}

  add(product: Product): void {
    const existing = this.items.find((i) => i.product.code === product.code);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ product, quantity: 1 });
    }
  }

  getItems(): BasketItem[] {
    return [...this.items];
  }

  clear(): void {
    this.items = [];
  }

  total(): number {
    const subtotal = this.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const discount = this.offers.reduce(
      (sum, o) => sum + o.apply(this.items),
      0
    );
    const afterDiscount = subtotal - discount;
    const deliveryCost = this.delivery.apply(afterDiscount);
    return parseFloat((afterDiscount + deliveryCost).toFixed(2));
  }
}
