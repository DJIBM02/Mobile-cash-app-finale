import { Text, FlatList } from "react-native";
import React from "react";
import "nativewind";

const ServicesContact = ({ posts }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <Text ClassName='text-3xl text-white'>{item.id}</Text>
      )}
      horizontal
    />
  );
};

export default ServicesContact;
