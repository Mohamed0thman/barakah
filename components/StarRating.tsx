import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, ViewProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Typography } from "./Typography";

type Props = ViewProps & {
  maxStars?: number;
  initialRating?: number;
  count?: number;
  onRatingChange?: (rate: number) => void;
};

export const StarRating = ({
  maxStars = 5,
  initialRating = 0,
  count,
  onRatingChange,
}: Props) => {
  const [rating, setRating] = useState<number>(initialRating);

  const handleRating = (rate: number) => {
    setRating(rate);
    if (onRatingChange) {
      onRatingChange?.(rate);
    }
  };

  return (
    <View className="flex-row items-center">
      {Array.from({ length: maxStars }, (_, index) => (
        <TouchableOpacity key={index} onPress={() => handleRating(index + 1)}>
          <Ionicons
            name={index < rating ? "star" : "star-outline"}
            size={8}
            color="#FFD700"
            style={styles.star}
          />
        </TouchableOpacity>
      ))}

      {count && <Typography>{count}</Typography>}
    </View>
  );
};

const styles = StyleSheet.create({
  star: {
    marginHorizontal: 5,
  },
});
