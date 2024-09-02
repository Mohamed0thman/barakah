import { View } from "react-native";
import React, { useCallback } from "react";
import { useCartProductList } from "@/hooks/useCartQuery";
import { Image, RootView, Typography } from "@/components";
import { CartItem } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useCartStore } from "@/store";
import { useShallow } from "zustand/react/shallow";

const CartScreen = () => {
  const { cartItems, updateQuantity, removeFromCart, totalPrice } =
    useCartStore(useShallow((state) => state));

  const { data } = useCartProductList(cartItems);

  const renderCartItem = useCallback(
    ({ item, index }: { item: CartItem; index: number }) => {
      return (
        <View className="flex-row w-full justify-between items-center gap-s p-s">
          <Image
            uri={data?.cartProducts[index].image as string}
            className=" w-[200] h-[100] basis-1/3"
            contentFit="contain"
          />
          <View className="gap-m basis-1/3">
            <Typography variant="h3">
              {data?.cartProducts[index].title}
            </Typography>
            <View className=" flex-row items-center justify-center gap-m">
              <TouchableOpacity
                onPress={() =>
                  updateQuantity(
                    data?.cartProducts[index].id as number,
                    -1,
                    -(data?.cartProducts[index].price as number)
                  )
                }
              >
                <AntDesign name="minuscircle" size={24} color="black" />
              </TouchableOpacity>
              <Typography variant="h3">{item.quantity}</Typography>
              <TouchableOpacity
                onPress={() =>
                  updateQuantity(
                    data?.cartProducts[index].id as number,
                    +1,
                    +(data?.cartProducts[index].price as number)
                  )
                }
              >
                <AntDesign name="pluscircle" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() =>
              removeFromCart(data?.cartProducts[index].id as number)
            }
          >
            <Entypo name="trash" size={24} color="red" />
          </TouchableOpacity>
        </View>
      );
    },
    [data?.cartProducts.length]
  );

  return (
    <RootView>
      <View className="flex-1 bg-white pt-m px-m">
        <FlatList
          renderItem={renderCartItem}
          // estimatedItemSize={50}
          data={cartItems ?? []}
          className="mb-m"
          showsVerticalScrollIndicator={false}
        />
        <View className="mb-xl flex-row items-center">
          <Typography variant="h3">total Price: </Typography>
          <Typography variant="h2">
            {((data?.totalPrice as number) + totalPrice).toFixed(2)}
          </Typography>
        </View>
      </View>
    </RootView>
  );
};

export default CartScreen;
