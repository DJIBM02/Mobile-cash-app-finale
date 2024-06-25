import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardType,
  secureTextEntry,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error] = useState("");

  const isPasswordField =
    title === "Mot de passe" || title === "Confirmé le mot de passe";

  return (
    <View className={`space-y-2 space-x-2 gap-1 ${otherStyles}`}>
      <Text className='text-m text-gray-100 font-pmedium'>{title}</Text>

      <View className='border-2 border-black-200 w-full h-12 px-4  focus:border-secondary items-center flex-row'>
        <TextInput
          className='flex-1 text-white font-psemibold text-base'
          value={value}
          placeholder={placeholder}
          placeholderTextColor={error ? "red" : "#7b7b8b"}
          onChangeText={handleChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry && !showPassword}
        />

        {isPasswordField && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eyeHide : icons.eye}
              className='w-6 h-6'
              resizeMode='contain'
            />
          </TouchableOpacity>
        )}
      </View>

      {error ? (
        <Text text-red-500 text-xs mt-1>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

export default FormField;
