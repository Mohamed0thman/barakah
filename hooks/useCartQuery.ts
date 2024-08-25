import agent from "@/api";
import { useCartStore } from "@/store";
import { Cart, CartItem, CartProduct, ErrorType, Product } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

const fetchCartData = async (
  userId: number
): Promise<{ cart: Cart; totalItem: number }> => {
  try {
    let totalItem = 0;
    const cart: [Cart] = await agent.CartApi.cart(userId);
    cart[0].products.forEach((product) => {
      totalItem += product.quantity;
    });

    return { totalItem, cart: cart[0] };
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const useCartList = (userId: number) => {
  const setCartData = useCartStore((state) => state.setCartData);

  return useQuery<{ cart: Cart; totalItem: number }>({
    queryKey: ["cart"],
    queryFn: async () => {
      const data = await fetchCartData(userId);
      setCartData(data.cart, data.totalItem); // Update Zustand store with the fetched data
      return data;
    },
  });
};
const fetchCartProdcutsData = async (
  cartItems: CartItem[]
): Promise<{ cartProducts: CartProduct[]; totalPrice: number }> => {
  try {
    let totalPrice = 0;
    const cartProducts: CartProduct[] = await Promise.all(
      cartItems.map(async (product) => {
        const data: Product = await agent.ProductsApi.product(
          product.productId
        );

        totalPrice + product.quantity * data.price;

        return { ...product, ...data };
      })
    );
    return { cartProducts, totalPrice };
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const useCartProductList = (cartItems: CartItem[]) => {
  return useQuery<{ cartProducts: CartProduct[]; totalPrice: number }>({
    queryKey: ["cartProduct"],
    queryFn: () => fetchCartProdcutsData(cartItems),
  });
};

export const useAddCartMutation = ({
  onError,
  onSuccess,
}: {
  onError?: (error: ErrorType) => void;
  onSuccess?: () => void;
} = {}) =>
  useMutation({
    mutationFn: (params: Cart) => agent.CartApi.addCart(params),
    onError(error: ErrorType) {
      console.log(error.message);

      onError?.(error);
    },
    onSuccess(s) {
      console.log("yes", s);

      onSuccess?.();
    },
  });
