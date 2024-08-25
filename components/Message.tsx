import { View } from "react-native";
import React from "react";
import { Typography } from "./Typography";

type Props = {
  message?: string;
};

export const Message = ({ message }: Props) => {
  return (
    <View className="flex-1 justify-center items-center">
      <Typography variant="h1">{message || "Something Went Wrong "}</Typography>
    </View>
  );
};
