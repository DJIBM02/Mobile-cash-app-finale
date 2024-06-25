// components/CustomButton.jsx

import { TouchableOpacity, Text } from "react-native";
import React from "react";
import "nativewind"; // Ensure nativewind is imported

const CustomButton = ({
  title,
  handlePress,
  containerStyle,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      style={{
        borderWidth: 13,
        borderBlockColor: "#161622",
        borderStartColor: "#161622",
        borderEndColor: "#161622",
        borderBottomLeftRadius: 17,
        borderBottomRightRadius: 17,
        borderTopLeftRadius: 17,
        borderTopRightRadius: 17,
      }}
      className={`bg-secondary rounded-r-2xl min-h-[61px] justify-center items-center 
      ${containerStyle}  ${isLoading ? "opacity-50" : ""}`}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <Text className={`text-primary font-medium text-base ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
