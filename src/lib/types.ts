
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating?: number;
  category: string;
  reviews?: number;
  data_ai_hint?: string;
}

export interface CartItem {
  id?: string;
  product: Product;
  quantity: number;
}
