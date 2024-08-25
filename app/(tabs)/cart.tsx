import { Text, View } from "react-native";
import React from "react";
import { useCartProductList } from "@/hooks/useCartQuery";
import { useCartContext } from "@/context";

const CartScreen = () => {
  const cartItems = useCartContext((state) => state.cartItems);

  const { data, error } = useCartProductList(cartItems);

  console.log("data, errormcartItems", data, error);

  return (
    <View>
      <Text>dsad</Text>
    </View>
  );
};

export default CartScreen;
