import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "nativewind";

const RequestPage = () => {
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className='min-h-[85vh] justify-center items-center w-full px-4'>
          <Text className='text-2xl text-green-500 font-bold'>MaGeNo</Text>
          {/* Place your QR Code component here */}
          <Text className='text-white mt-4'>
            Your QR code will be here and UserName
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RequestPage;
