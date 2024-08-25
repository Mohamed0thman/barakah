import { Message, Typography } from "@/components";
import { useCartList } from "@/hooks";
import { CartState, useCartStore } from "@/store";
import { createContext, ReactNode, useContext, useRef } from "react";
import { useStore as useZustandStore } from "zustand";

type CartProviderProps = {
  children: ReactNode;
};

const CartContext = createContext<typeof useCartStore | null>(null);

export function CartProvider({ children }: CartProviderProps) {
  const { isLoading, error } = useCartList(2); // Fetch cart data for user with ID 2

  const storeRef = useRef(useCartStore);

  if (error)
    return <Message message={error?.message || "Something went wrong"} />;

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <CartContext.Provider value={storeRef.current}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the store in components
export function useCartContext<T>(selector: (state: CartState) => T): T {
  const store = useContext(CartContext);
  if (!store) throw new Error("Missing CartContext.Provider in the tree");
  return useZustandStore(store, selector);
}
