import { Text, TextProps } from "react-native";
import React from "react";
import clsx from "clsx";

const variantStyles = {
  default: "color-back text-s",
  h1: "text-xxl font-bold",
  h2: "text-xl font-bold",
  h3: `text-l font-medium`,
  p: `text-m`,
};

type Props = TextProps & {
  variant?: "default" | "h1" | "h2" | "h3" | "p";
};

export const Typography = ({ className, variant = "p", children }: Props) => {
  return (
    <Text
      className={clsx(
        `${variantStyles.default}  ${variantStyles[variant]} ${className}  `
      )}
    >
      {children}
    </Text>
  );
};
