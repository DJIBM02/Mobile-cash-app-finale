import { router } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";

const TransactionFailed = () => {
  return (
    <SafeAreaView className='bg-primary flex-1 justify-center items-center'>
      <ScrollView>
        <View className='items-center min-h-[85vh] top-72'>
          <Image
            source={images.bad}
            resizeMode='contain'
            className='w-24 h-24'
            alt='Success'
          />
          <Text className='text-2xl text-white font-semibold mt-4'>
            Transaction echoué
          </Text>
          <Text className='text-white text-lg mt-2'>
            fonds insuffisant ou probléme de connection.
          </Text>
          <Text className='text-white text-lg mt-2'>
            {" "}
            S'il vous plait veuillez réessayez
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

export default TransactionFailed;
