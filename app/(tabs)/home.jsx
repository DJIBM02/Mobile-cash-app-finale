import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Image,
  BackHandler,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../constants";
import ProfileImagePicker from "../../components/ProfileImagePicker";
import ImageSlider from "../../components/ImageSlideshow";
import { router, useFocusEffect } from "expo-router";
import MenuPopUp from "../../components/MenuPopUp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import CustomExitModal from "../../components/CustomExitModal";
import "nativewind";

const Home = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [user, setUser] = useState(null);
  const [exitModalVisible, setExitModalVisible] = useState(false);

  async function getData() {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get("http://192.168.43.238:3000/api/user/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { data } = res;
      setUser(data.user);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleBackPress = () => {
    setExitModalVisible(true);
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", handleBackPress);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
      };
    }, [])
  );

  useEffect(() => {
    getData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };

  const handleNotificationPress = () => {
    setHasUnreadNotifications(false);
    router.navigate("/notifications");
  };

  const renderHeader = () => (
    <View className='my-6 px-4 mt-5 w-full border-b-[1px] border-black-200'>
      <View className='flex-row justify-between items-center gap-1 mb-5 w-full'>
        <View className='flex-row items-center'>
          <View className='ml-4 flex-row items-center'>
            <Text
              style={{ color: "#32cd32" }}
              className='font-pmedium text-lg text-gray-100 mr-4'
            >
              MaGeNo
            </Text>
            <Image
              source={images.logo}
              contentFit='cover'
              className='w-9 h-9'
            />
          </View>
        </View>
        <View className='flex-row gap-2'>
          <TouchableOpacity className='h-9 w-10 rounded-full bg-gray-700 justify-center items-center'>
            <MenuPopUp />
          </TouchableOpacity>
          <TouchableOpacity
            className='h-9 w-10 rounded-full bg-gray-700 justify-center items-center relative'
            onPress={handleNotificationPress}
          >
            <Image source={icons.bell} className='w-7 h-7' contentFit='cover' />
            {hasUnreadNotifications && (
              <View className='absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full' />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderProfileSection = () => (
    <View className='border-2 border-black-100 rounded-xl px-4 py-8 space-x-2'>
      <View className='flex-row items-start justify-start'>
        <View className='border-r border-black-200 h-3'>
          <ProfileImagePicker
            initialImage={profileImage}
            setProfileImage={setProfileImage}
          />
        </View>
        <View className='ml-12 mt-1 flex-1'>
          {loading ? (
            <ActivityIndicator size='medium' color='#0000ff' />
          ) : (
            <>
              <Text className='text-lg font-psemibold text-white'>
                {user?.first_name} {user?.last_name}
              </Text>
              <Text className='text-base font-pregular text-white mt-2'>
                {user?.email}
              </Text>
              <Text className='text-base font-pregular text-white mt-2'>
                Balance: {user?.wallet?.account_balance?.$numberDecimal || "0"}{" "}
                {user?.wallet?.currency}
              </Text>
            </>
          )}
        </View>
      </View>
      <View className='py-2'>
        <View className='flex-row justify-around bg-transparent items-center'>
          <TouchableOpacity
            className='w-20 h-20 rounded-xl bg-gray-800 justify-center items-center'
            onPress={() => router.navigate("Depot")}
          >
            <Image
              source={icons.purse}
              className='w-8 h-8 mb-2'
              contentFit='cover'
            />
            <Text className='text-white font-medium text-base'>Dépot</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className='w-20 h-20 rounded-xl bg-gray-800 justify-center items-center'
            onPress={() => router.navigate("Scanner")}
          >
            <Image
              source={icons.scan}
              className='w-8 h-8 mb-2'
              contentFit='cover'
            />
            <Text className='text-white font-medium text-base'>Scanner</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className='w-20 h-20 rounded-xl bg-gray-800 justify-center items-center'
            onPress={() => router.navigate("Transfer")}
          >
            <Image
              source={icons.transfer}
              className='w-8 h-8 mb-2'
              contentFit='cover'
            />
            <Text className='text-white font-medium text-base'>Transfert</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className='bg-primary h-full'>
      <View className='flex-1'>
        <FlatList
          data={[]}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={({ item }) => (
            <Text className='text-3xl text-white'>{item.id}</Text>
          )}
          ListHeaderComponent={renderHeader}
        />
        <Text className='text-white text-2xl font-psemibold ml-3 mb-8'>
          Bienvenue
        </Text>
        <FlatList
          ListHeaderComponent={renderProfileSection}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
        <View className='w-full relative py-6 px-4 bg-primary border-t-2 border-black-100'>
          <Text className='text-gray-100 text-lg font-pregular mb-3'>PUB</Text>
        </View>
        <ImageSlider />
      </View>
      <CustomExitModal
        visible={exitModalVisible}
        onClose={() => setExitModalVisible(false)}
        onExit={() => BackHandler.exitApp()}
      />
    </SafeAreaView>
  );
};

export default Home;
