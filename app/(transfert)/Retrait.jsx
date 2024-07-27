// @ts-nocheck
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { icons, images } from "../../constants";
import { Image } from "expo-image";
import { useHeaderHeight } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";

const Retrait = () => {
  const headerHeight = useHeaderHeight();

  const PaymentOption = ({ title, image, onPress }) => (
    <TouchableOpacity
      className='w-full h-24 rounded-xl mb-4 overflow-hidden'
      onPress={onPress}
    >
      <LinearGradient
        colors={["#2c3e50", "#34495e"]}
        className='flex-1 flex-row items-center justify-between px-5'
      >
        <Text className='font-semibold text-lg text-white'>{title}</Text>
        <Image source={image} contentFit='contain' className='w-20 h-10' />
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{ paddingTop: headerHeight }}
      className='flex-1 bg-primary'
    >
      <View className='flex-1 w-full justify-center items-center p-5'>
        <Image
          source={icons.purse}
          className='w-32 h-32 mb-5'
          contentFit='contain'
        />
        <Text className='font-bold text-2xl text-white mb-8'>
          Recharge de compte
        </Text>
        <View className='w-full'>
          <Text className='font-semibold text-lg text-white mb-5 self-start'>
            Choisir un mode de paiement
          </Text>
          <PaymentOption
            title='Orange Money'
            image={images.OM}
            onPress={() => router.navigate("/OmRetrait")}
          />
          <PaymentOption
            title='MTN-Mobile-Money'
            image={images.momo}
            onPress={() => router.navigate("/MoMoRetrait")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Retrait;
