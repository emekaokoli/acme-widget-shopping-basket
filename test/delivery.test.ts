import { defaultDelivery } from '../src/domain/delivery/default-delivery';

describe('Delivery Calculation', () => {
  const delivery = defaultDelivery();

  test('should charge $4.95 for orders under $50', () => {
    expect(delivery.apply(49.99)).toBe(4.95);
    expect(delivery.apply(0)).toBe(4.95);
    expect(delivery.apply(25)).toBe(4.95);
  });

  test('should charge $2.95 for orders between $50 and $89.99', () => {
    expect(delivery.apply(50)).toBe(2.95);
    expect(delivery.apply(75)).toBe(2.95);
    expect(delivery.apply(89.99)).toBe(2.95);
  });

  test('should provide free delivery for orders $90 and above', () => {
    expect(delivery.apply(90)).toBe(0);
    expect(delivery.apply(100)).toBe(0);
    expect(delivery.apply(1000)).toBe(0);
  });
});
