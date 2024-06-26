import { View, Text, Image } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { images } from "../constants";

const EmptyState = ({
  title,
  subtitle,
  buttonTitle,
  buttonAction,
  containerStyle,
  titleStyle,
  subtitleStyle,
  buttonStyle,
  showButton = true,
}) => {
  return (
    <View className={`justify-center items-center px-4 ${containerStyle}`}>
      <Image
        source={images.empty}
        className={`w-[260px] h-[240px] `}
        contentFit='cover'
      />
      <Text
        className={`font-pmedium text-2xl ${titleStyle}`}
        style={{ color: "white", fontSize: 22 }}
      >
        {title}
      </Text>
      <Text
        className={`text-lg font-psemibold mt-4 ${subtitleStyle}`}
        style={{ color: "white", fontSize: 17 }}
      >
        {subtitle}
      </Text>

      {showButton && (
        <CustomButton
          title={buttonTitle}
          handlePress={buttonAction}
          containerStyle={`w-full my-5 ${buttonStyle}`}
        />
      )}
    </View>
  );
};

export default EmptyState;
