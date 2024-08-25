import {
  ColumnItem,
  Image,
  Message,
  RootView,
  StarRating,
  Typography,
} from "@/components";
import { useCategoryList, useProductList } from "@/hooks";
import { Category, Product } from "@/types";
import { FlashList } from "@shopify/flash-list";
import { Link, RouteParamInput, useNavigation, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Pressable, View } from "react-native";

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const router = useRouter();
  const navigation = useNavigation();

  const {
    data: categories,
    error: categoryError,
    isLoading: categoryLoading,
  } = useCategoryList();
  const {
    data: products,
    error: productError,
    isLoading: productLoading,
  } = useProductList(selectedCategory);

  const handleOnSelectCategory = (category: Category) =>
    setSelectedCategory(category);

  const renderCategory = useCallback(
    ({ item }: { item: Category }) => {
      const active = selectedCategory === item;
      return (
        <Pressable onPress={() => handleOnSelectCategory(item)}>
          <View
            className={`p-s  mr-s rounded-m  ${
              active ? "bg-primry-300" : "bg-white"
            } `}
          >
            <Typography variant={"h3"} className="capitalize font-bold">
              {item}
            </Typography>
          </View>
        </Pressable>
      );
    },
    [selectedCategory]
  );

  const renderProduct = useCallback(({ item }: { item: Product }) => {
    return (
      <Link
        href={{
          pathname: "/details",
          params: {
            ...item,
            ...item.rating,
          } as unknown as RouteParamInput<"/details">,
        }}
        asChild
      >
        <Pressable className="w-full h-full  p-xs ">
          <Image uri={item.image} className="h-[200] p-xs " />
          <Typography>{item.title}</Typography>

          <Typography>{item.price}</Typography>

          <StarRating
            initialRating={item.rating.rate}
            count={item.rating.count}
          />
        </Pressable>
      </Link>
    );
  }, []);

  useEffect(() => {
    navigation.setOptions({ title: "Home" });
  }, [navigation]);

  if (productError || categoryError)
    return (
      <Message message={productError?.message || categoryError?.message} />
    );

  // if (categoryLoading || productLoading) return;
  return (
    <RootView>
      <View className="flex-1 bg-white pt-m px-m">
        <FlashList
          renderItem={renderCategory}
          horizontal
          estimatedItemSize={50}
          data={["all", ...(categories ?? [])]}
          className="mb-m"
          showsHorizontalScrollIndicator={false}
        />

        <FlashList
          renderItem={renderProduct}
          numColumns={2}
          estimatedItemSize={50}
          data={products ?? []}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </RootView>
  );
}
