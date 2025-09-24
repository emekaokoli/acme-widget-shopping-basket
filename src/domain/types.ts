import { BasketItem } from "./product";

export interface OfferStrategy {
  apply(items: BasketItem[]): number;
}

export interface DeliveryStrategy {
  apply(subtotal: number): number;
}