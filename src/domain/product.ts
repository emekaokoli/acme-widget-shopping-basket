export interface Product {
  code: string;
  name: string;
  price: number;
}

export interface BasketItem {
  product: Product;
  quantity: number;
}
