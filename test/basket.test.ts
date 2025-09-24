import { createBasketService } from '../src/application/basket-service';
import { defaultDelivery } from '../src/domain/delivery/default-delivery';
import { redWidgetOffer } from '../src/domain/offers/red-widget-offer';

describe('Basket Service', () => {
  const products = [
    { code: 'R01', name: 'Red Widget', price: 32.95 },
    { code: 'G01', name: 'Green Widget', price: 24.95 },
    { code: 'B01', name: 'Blue Widget', price: 7.95 },
  ];

  const getProduct = (code: string) => {
    const product = products.find(p => p.code === code);
    if (!product) throw new Error(`Product ${code} not found`);
    return product;
  };

  let basket: ReturnType<typeof createBasketService>;

  beforeEach(() => {
    basket = createBasketService(
      [redWidgetOffer()],
      defaultDelivery()
    );
  });

  test('should add items to the basket', () => {
    basket.add(getProduct('R01'));
    basket.add(getProduct('G01'));
    expect(basket.total()).toBeCloseTo(60.85);
  });

  test('should apply half price offer on second red widget', () => {
    basket.add(getProduct('R01'));
    basket.add(getProduct('R01'));
    expect(basket.total()).toBeCloseTo(54.38, 2);
  });

  test('should apply delivery charge correctly', () => {
    basket.add(getProduct('B01'));
    expect(basket.total()).toBeCloseTo(12.90); 

    basket.add(getProduct('G01'));
    basket.add(getProduct('G01')); 
    expect(basket.total()).toBeCloseTo(60.80, 2); 

    basket.add(getProduct('R01'));
    basket.add(getProduct('R01')); 
    expect(basket.total()).toBeCloseTo(107.28, 2); 
  });

  test('should handle example scenarios correctly', () => {
    let testBasket = createBasketService([redWidgetOffer()], defaultDelivery());
    testBasket.add(getProduct('B01'));
    testBasket.add(getProduct('G01'));
    expect(testBasket.total()).toBeCloseTo(37.85, 2);

    testBasket = createBasketService([redWidgetOffer()], defaultDelivery());
    testBasket.add(getProduct('R01'));
    testBasket.add(getProduct('R01'));
    expect(testBasket.total()).toBeCloseTo(54.38, 2);

    testBasket = createBasketService([redWidgetOffer()], defaultDelivery());
    testBasket.add(getProduct('R01'));
    testBasket.add(getProduct('G01'));
    expect(testBasket.total()).toBeCloseTo(60.85, 2);

    testBasket = createBasketService([redWidgetOffer()], defaultDelivery());
    testBasket.add(getProduct('B01'));
    testBasket.add(getProduct('B01'));
    testBasket.add(getProduct('R01'));
    testBasket.add(getProduct('R01'));
    testBasket.add(getProduct('R01'));
    expect(testBasket.total()).toBeCloseTo(98.28, 2);
  });

  test('should handle multiple quantities correctly', () => {
    basket.add(getProduct('R01'));
    basket.add(getProduct('R01'));
    basket.add(getProduct('R01'));
    expect(basket.total()).toBeCloseTo(85.33, 2);
  });
});
