import React from "react";
import { View, Text } from "react-native";
import "nativewind";

const PasswordStrengthIndicator = ({ strength }) => {
  const getColor = () => {
    switch (strength) {
      case "fort":
        return "bg-green-500";
      case "medium":
        return "bg-orange-500";
      case "faible":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <View className='flex-row gap-1 mt-1'>
      <View className={`w-8 h-1 mt-2 rounded ${getColor()}`} />
      <View className={`w-8 h-1 mt-2 rounded ${getColor()}`} />
      <View className={`w-8 h-1 mt-2 rounded ${getColor()}`} />
      <Text className='text-xs text-gray-400 mt-1'>
        {strength === "fort"
          ? "fort"
          : strength === "medium"
          ? "Medium"
          : "faible"}
      </Text>
    </View>
  );
};

export default PasswordStrengthIndicator;
