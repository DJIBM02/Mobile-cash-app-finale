import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { icons, images } from "../../constants";
import "nativewind";
import { Image } from "expo-image";
import { useHeaderHeight } from "@react-navigation/elements";

const Create = () => {
  const headerHeight = useHeaderHeight();

  return (
    <SafeAreaView
      style={{ paddingTop: headerHeight }}
      className='bg-primary flex-auto border border-black-200'
    >
      <View className='flex-auto w-full justify-center items-center p-12 '>
        <Image
          source={icons.purse}
          className='w-[200px] h-[150px]'
          contentFit='cover'
        />
        <Text className='font-psemibold text-lg text-white'>
          Recharge de compte
        </Text>
        <View className='mt-6 w-full px-4'>
          <Text className='font-pregular text-base text-white mb-2'>
            choisir un mode de paiement
          </Text>
          <TouchableOpacity
            className='w-[295px] min-h-[91px] rounded-xl  flex items-center justify-center bg-gray-800 mb-4'
            onPress={() => router.navigate("/OmDepot")}
          >
            <Text className='font-pregular text-base text-white mb-2'>
              Orange Money
            </Text>
            <Image
              source={images.OM}
              contentFit='cover'
              className='w-40 h-20 mt-2'
            />
          </TouchableOpacity>
          <TouchableOpacity
            className='w-[295px] min-h-[91px] rounded-xl p-2 flex items-center justify-center bg-gray-800 mb-4'
            onPress={() => router.navigate("/MoMoDepot")}
          >
            <Text className='font-pregular text-base text-white mb-2'>
              MTN-Mobile-Money
            </Text>
            <Image
              source={images.momo}
              contentFit='cover'
              className='w-40 h-20 mt-2'
            />
          </TouchableOpacity>
          <TouchableOpacity
            className='w-[295px] min-h-[91px] rounded-xl  flex items-center justify-center bg-gray-800 mb-4'
            onPress={() => router.navigate("/VisaDepot")}
          >
            <Text className='font-pregular text-base text-white mb-2'>
              Visa-Card
            </Text>
            <Image
              source={images.VISA}
              contentFit='cover'
              className='w-40 h-20 mt-2'
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Create;
