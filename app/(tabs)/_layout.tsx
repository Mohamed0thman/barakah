import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Typography } from "@/components";
import { View } from "react-native";
import { CartProvider, useCartContext } from "@/context";

const TabsList = () => {
  const totalItem = useCartContext((state) => state.totalItem);

  console.log("totalItem", totalItem);

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={focused ? "#C3E600" : "#AFAFAF"}
            />
          ),
          tabBarLabel: ({ focused, children }) => (
            <Typography
              className={`${focused ? "color-primry-500" : "color-gray-400"}`}
            >
              {children}
            </Typography>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ focused }) => (
            <View>
              <View className="bg-black rounded-full justify-center items-center w-[15] h-[15] absolute top-[-10] right-[-10] z-10 ">
                <Typography className=" text-white">{totalItem}</Typography>
              </View>
              <TabBarIcon
                name={focused ? "cart" : "cart-outline"}
                color={focused ? "#C3E600" : "#AFAFAF"}
              />
            </View>
          ),
          tabBarLabel: ({ focused, children }) => (
            <Typography
              className={`${focused ? "color-primry-500" : "color-gray-400"}`}
            >
              {children}
            </Typography>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={focused ? "#C3E600" : "#AFAFAF"}
            />
          ),
          tabBarLabel: ({ focused, children }) => (
            <Typography
              className={`${focused ? "color-primry-500" : "color-gray-400"}`}
            >
              {children}
            </Typography>
          ),
        }}
      />
    </Tabs>
  );
};

export default function TabLayout() {
  return (
    <CartProvider>
      <TabsList />
    </CartProvider>
  );
}
