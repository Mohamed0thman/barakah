import { Pressable, PressableProps, View } from "react-native";
import React, { forwardRef } from "react";
import { clsx } from "clsx";
import { Typography } from "./Typography";

const variantStyles = {
  default: "justify-center items-center rounded-lg p-4 py-m  ",
  primary: "bg-primry-500",
  outline: "border-primry-500 border bg-transparent",
};

const variantTextStyles = {
  default: "rounded-m",
  primary: "text-black",
  outline: "text-primry-500",
};

type Props = PressableProps & {
  variant?: "default" | "primary" | "outline";
  icon?: React.ReactNode;
  text?: string;
};

export const Button = forwardRef<View, Props>(
  ({ className, icon, variant = "primary", text, ...rest }, ref) => {
    return (
      <Pressable
        ref={ref}
        className={clsx(
          `${variantStyles.default} ${variantStyles[variant]} ${className}`
        )}
        {...rest}
      >
        {icon && icon}
        {text && (
          <Typography
            variant="h2"
            className={clsx(
              `${variantTextStyles.default} ${variantTextStyles[variant]}  `
            )}
          >
            {text}
          </Typography>
        )}
      </Pressable>
    );
  }
);

Button.displayName = "Button";
