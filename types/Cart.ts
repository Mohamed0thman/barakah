import { Product } from "./Product";

export interface Cart {
  id?: number;
  userId: number;
  date: string;
  products: CartProduct[] | CartItem[];
}

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface CartProduct extends Product, CartItem {}
