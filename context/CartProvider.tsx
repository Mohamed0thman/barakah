import { Message, Typography } from "@/components";
import { useCartList } from "@/hooks";
import { Cart } from "@/types";
import { createContext, ReactNode } from "react";

type CartProviderProps = {
  children: ReactNode;
};

// Define the CartContext with the Cart type or null
const CartContext = createContext<{ cart: Cart; totalItem: number } | null>(
  null
);

export function CartProvider({ children }: CartProviderProps) {
  const { isLoading, error, data } = useCartList(2); // Fetch cart data for user with ID 2

  if (error) {
    return <Message message={error?.message || "Something went wrong"} />;
  }

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <CartContext.Provider value={data ?? null}>{children}</CartContext.Provider>
  );
}
