import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";
import "nativewind";

const ServicesDépot = ({
  title,
  imageSource,
  containerStyle,
  imageStyle,
  titleStyle,
}) => {
  return (
    <View className={`justify-center items-center px-4 ${containerStyle}`}>
      <Image
        source={imageSource}
        className={`w-[280px] h-[240px] ${imageStyle}`}
        contentFit='cover'
      />
      <Text
        className={`font-pmedium text-2xl ${titleStyle}`}
        style={{ color: "white", fontSize: 22 }}
      >
        {title}
      </Text>
    </View>
  );
};

export default ServicesDépot;
