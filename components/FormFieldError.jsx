// @ts-nocheck
// components/FormFieldError.js

import React from "react";
import { View, Text } from "react-native";

const FormFieldError = ({ error }) => {
  if (!error) return null;

  return (
    <View className='mt-1'>
      <Text className='text-white border-2 bg-red-500 text-xs'>{error}</Text>
    </View>
  );
};

export default FormFieldError;
