// @ts-nocheck
// MainComponent.js or your main component
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Text,
  StatusBar,
} from "react-native";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useAuth } from "../data/useLoggedInStatus"; // adjust the import path
import Loader from "../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Redirect } from "expo-router";
import "nativewind";

const MainComponent = () => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const { isLoggedIn, loading: authLoading } = useAuth();

  useEffect(() => {
    async function checkLoggedInState() {
      try {
        const token = await AsyncStorage.getItem("token");

        if (authLoading) {
          setLoading(true);
          return;
        }

        if (!isLoggedIn && !token) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    checkLoggedInState();
  }, [isLoggedIn, authLoading]);

  if (loading) {
    return <Loader isLoading={loading} />;
  }

  if (loggedIn) {
    return <Redirect href='/home' />;
  }

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
};

export default MainComponent;
