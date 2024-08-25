import { Cart, CartItem, CartProduct } from "@/types";
import { create } from "zustand";

export interface CartState {
  totalPrice: number;
  totalItem: number;
  cartItems: CartItem[] | CartProduct[];
  setCartData: (cart: Cart, totalItem: number) => void;
  addToCart: (item: CartItem | CartProduct) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  totalPrice: 0,
  totalItem: 0,
  setCartData: (cart, totalItem) => {
    console.log("cart, totalItem", cart, totalItem);

    set({ cartItems: cart.products, totalItem });
  },
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.productId === item.productId
      );
      if (existingItem) {
        return {
          ...state,
          cart: state.cartItems.map((cartItem) =>
            cartItem.productId === item.productId
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    }),
  removeFromCart: (id) =>
    set((state) => ({
      ...state,
      cartItems: state.cartItems.filter((item) => item.productId !== id),
    })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      ...state,
      cartItems: state.cartItems.map((item) =>
        item.productId === id ? { ...item, quantity } : item
      ),
    })),
  clearCart: () =>
    set((state) => ({
      ...state,
      cartItems: [],
    })),
}));
