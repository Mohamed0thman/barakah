import { View } from "react-native";
import React, { useCallback } from "react";
import { useCartProductList } from "@/hooks/useCartQuery";
import { useCartContext } from "@/context";
import { Image, Message, RootView, Typography } from "@/components";
import { FlashList } from "@shopify/flash-list";
import { CartProduct } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { TouchableOpacity } from "react-native-gesture-handler";

const CartScreen = () => {
  const cartItems = useCartContext((state) => state.cartItems);
  const updateQuantity = useCartContext((state) => state.updateQuantity);

  const { data, error, isLoading } = useCartProductList(cartItems);

  if (error)
    return <Message message={error?.message || "Something went wrong"} />;

  if (isLoading) return <Typography>Loading...</Typography>;

  const renderCartItem = useCallback(
    ({ item }: { item: CartProduct; index: number }) => {
      return (
        <View className="flex-row w-full justify-center items-center gap-s p-s">
          <Image uri={item.image} className=" w-1/4" contentFit="contain" />
          <View className="gap-m">
            <Typography variant="h3" className="w-3/4">
              {item.title}
            </Typography>
            <View className=" flex-row items-center justify-center gap-m">
              <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
                <AntDesign name="minuscircle" size={24} color="black" />
              </TouchableOpacity>
              <Typography variant="h3">{item.quantity}</Typography>
              <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
                <AntDesign name="pluscircle" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity>
            <Entypo name="trash" size={24} color="red" />
          </TouchableOpacity>
        </View>
      );
    },
    [cartItems]
  );

  return (
    <RootView>
      <View className="flex-1 bg-white pt-m px-m">
        <FlashList
          renderItem={renderCartItem}
          estimatedItemSize={50}
          data={data?.cartProducts ?? []}
          className="mb-m"
          showsVerticalScrollIndicator={false}
        />

        <Typography>{data?.totalPrice}</Typography>
      </View>
    </RootView>
  );
};

export default CartScreen;
