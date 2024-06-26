import { View, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import "nativewind";
import { router, usePathname } from "expo-router";

const SearchInput = ({ value, placeholder, keyboardType, initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className='border-4 border-black-200 w-full h-12 px-4 rounded-3xl  flex-row items-center space-x-2'>
      <TextInput
        className='flex-1 text-black font-pregular text-base'
        value={query}
        placeholder={placeholder}
        placeholderColor='#bef264'
        placeholderTextColor='#CDCDE0'
        onChangeText={(e) => setQuery(e)}
        keyboardType={keyboardType}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Requête manquante, veuillez saisir quelque chose à rechercher dans la BD"
            );
          }
          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} className='w-5 h-5' contentFit='cover' />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
