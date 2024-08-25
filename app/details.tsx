import { View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Product, Rating } from "@/types";
import { Button, Image, RootView, StarRating, Typography } from "@/components";
import { useCartStore } from "@/store";
import { useAddCartMutation } from "@/hooks/useCartQuery";

const DetailsSceen = () => {
  const product = useLocalSearchParams() as unknown as Product & Rating;

  const { addToCart } = useCartStore();
  const { mutate: addToCartApi } = useAddCartMutation();

  console.log("product", product.count);

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
        onPress={() =>
          addToCartApi({
            userId: 2,
            date: "2020-02-03",
            products: [
              { productId: 5, quantity: 1 },
              { productId: 1, quantity: 5 },
            ],
          })
        }
      />
    </RootView>
  );
};

export default DetailsSceen;
