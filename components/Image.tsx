import { View, ViewProps } from "react-native";
import React from "react";
import { Image as RNImage } from "expo-image";
import clsx from "clsx";

type Props = ViewProps & {
  uri: string;
};

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const Image = ({ uri, className }: Props) => {
  return (
    <View className={clsx(`h-[200] w-full  ${className}`)}>
      <RNImage
        style={{ height: "100%", width: "100%" }}
        source={{
          uri,
        }}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
      />
    </View>
  );
};
