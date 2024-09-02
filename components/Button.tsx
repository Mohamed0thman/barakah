import { TouchableOpacity, TouchableOpacityProps } from "react-native";
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

type Props = TouchableOpacityProps & {
  variant?: "default" | "primary" | "outline";
  icon?: React.ReactNode;
  text?: string;
};

export const Button = forwardRef<TouchableOpacity, Props>(
  ({ className, icon, variant = "primary", text, ...props }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        className={clsx(
          `${variantStyles.default} ${variantStyles[variant]} ${className}`
        )}
        {...props}
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
      </TouchableOpacity>
    );
  }
);

Button.displayName = "Button";
