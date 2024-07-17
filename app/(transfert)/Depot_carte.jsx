import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const Depot_carte = () => {
  return (
    <SafeAreaView className='bg-primary flex-1 justify-center items-center'>
      <View className='flex-col items-center'>
        <Text className='text-2xl text-white font-bold text-center mb-4'>
          Faire un dépot
          <Text className='text-green-500'> avec une carte </Text>
          ou <Text className='text-blue-500'>ajouter une carte</Text>
        </Text>

        <TouchableOpacity
          className='bg-gray-800 mt-4 rounded-2xl min-h-[55px] w-[180px] justify-center items-center'
          onPress={() => router.navigate("/Bank")}
        >
          <Text className='text-green-500 font-pmedium text-lg'>Dépot</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className='bg-gray-800 mt-4 rounded-2xl min-h-[55px] w-[180px] justify-center items-center'
          onPress={() => router.navigate("/VisaDepot")}
        >
          <Text className='text-blue-500 font-pmedium text-lg'>Ajouter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Depot_carte;
