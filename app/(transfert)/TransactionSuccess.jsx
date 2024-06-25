import { router } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import "nativewind";

const TransactionSuccess = () => {
  return (
    <SafeAreaView className='bg-primary flex-1 justify-center items-center'>
      <ScrollView>
        <View className='items-center'>
          <Image
            source={images.success}
            resizeMode='contain'
            className='w-24 h-24'
            alt='Success'
          />
          <Text
            style={{ color: "green" }}
            className='text-2xl font-semibold mt-4'
          >
            Transaction reussie
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className='mt-6 bg-red-500 p-3 rounded-lg'
          >
            <Text className='text-white'>Retourner</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransactionSuccess;
