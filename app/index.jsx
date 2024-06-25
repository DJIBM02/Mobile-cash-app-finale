import React from "react";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import { router } from "expo-router";
import CustomButton from "../components/CustomButton";
import "nativewind";

export default function App() {
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className='min-h-[85vh] justify-center items-center w-full px-4'>
          <Image
            source={images.logo}
            className='w-[200px] h-[145px]'
            resizeMode='contain'
          />

          <View className='relative mt-11 w-full items-center'>
            <Text className='text-2xl text-white font-bold text-center'>
              La puissance dans votre poche avec
              <Text style={{ color: "#32cd32" }}> MaGeNo </Text>
            </Text>

            <Image
              source={images.path}
              className='w-[136px] h-[15px] absolute'
              style={{ bottom: -20 }}
              resizeMode='contain'
            />
          </View>

          <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>
            Transférez en toute confiance, où que vous soyez. Avec notre appli
            mobile, vos sous voyagent plus vite que jamais!
          </Text>

          <CustomButton
            title="continuer avec l'email où n° de téléphone"
            handlePress={() => router.push("/sign-in")}
            containerStyle='w-full mt-7'
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  );
}
