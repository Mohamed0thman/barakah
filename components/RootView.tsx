import { View, ViewProps } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import clsx from "clsx";

type Props = ViewProps & { applyTop?: boolean; applyBottom?: boolean };

export const RootView = ({
  className,
  children,
  applyTop,
  applyBottom,
}: Props) => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingBottom: applyBottom ? bottom : 0,
        paddingTop: applyTop ? top : 0,
      }}
      className={clsx(`flex-1 bg-white  ${className}`)}
    >
      {children}
    </View>
  );
};
