import { redWidgetOffer } from '../src/domain/offers/red-widget-offer';

describe('Red Widget Offer', () => {
  const offer = redWidgetOffer();
  const redWidget = { code: 'R01', name: 'Red Widget', price: 32.95 };
  const greenWidget = { code: 'G01', name: 'Green Widget', price: 24.95 };

  test('should not apply discount for single red widget', () => {
    const items = [{ product: redWidget, quantity: 1 }];
    expect(offer.apply(items)).toBe(0);
  });

  test('should apply 50% discount on second red widget', () => {
    const items = [{ product: redWidget, quantity: 2 }];
    expect(offer.apply(items)).toBeCloseTo(redWidget.price / 2);
  });

  test('should handle odd number of red widgets', () => {
    const items = [{ product: redWidget, quantity: 3 }];
    // For 3 items: 2 full price + 1 half price = 2.5 units
    // Discount is 0.5 * price
    expect(offer.apply(items)).toBeCloseTo(redWidget.price / 2);
  });

  test('should handle even number of red widgets', () => {
    const items = [{ product: redWidget, quantity: 4 }];
    // For 4 items: 2 full price + 2 half price = 3 units
    // Discount is 2 * 0.5 * price = 1 * price
    expect(offer.apply(items)).toBeCloseTo(redWidget.price);
  });

  test('should not apply discount to other products', () => {
    const items = [
      { product: greenWidget, quantity: 2 },
      { product: redWidget, quantity: 1 }
    ];
    expect(offer.apply(items)).toBe(0);
  });
});
