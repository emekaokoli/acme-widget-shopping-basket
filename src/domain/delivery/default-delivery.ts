import type { DeliveryStrategy } from '../types';

export const defaultDelivery = (): DeliveryStrategy => ({
  apply: (subtotal: number) => {
    if (subtotal < 50) return 4.95;
    if (subtotal < 90) return 2.95;
    return 0;
  },
});
