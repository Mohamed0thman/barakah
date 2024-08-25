import { View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Product, Rating } from "@/types";
import { Button, Image, RootView, StarRating, Typography } from "@/components";
import { useCartStore } from "@/store";

const DetailsSceen = () => {
  const product = useLocalSearchParams() as unknown as Product & Rating;

  const { addToCart } = useCartStore();

  return (
    <RootView applyTop>
      <View>
        <Image uri={product.image} />
      </View>
      <StarRating initialRating={product.rate} count={product.count} />
      <Typography>{product.title}</Typography>

      <Button
        text="Add To Cart"
        className="w-3/4 self-center mt-auto mb-xl rounded-l"
        onPress={() => addToCart({ productId: product.id, quantity: 1 })}
      />
    </RootView>
  );
};

export default DetailsSceen;
