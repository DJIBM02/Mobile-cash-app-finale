import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../constants";
import ProfileImagePicker from "../../components/ProfileImagePicker";
import ImageSlider from "../../components/ImageSlideshow";
import { router } from "expo-router";
import CurrencyDisplay from "../../components/CurrencyDisplay";
import MenuPopUp from "../../components/MenuPopUp";
import "nativewind";

const fetchUserName = async () => {
  return {};
};

const fetchAccountBalance = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1217.56);
    }, 1000);
  });
};

const fetchCardNumber = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("1234567890123456");
    }, 1000);
  });
};

const formatCardNumber = (number) => {
  if (!number) return "";
  const visibleDigits = number.slice(0, 4);
  const hiddenDigits = number.slice(4).replace(/./g, "*");
  return `${visibleDigits}${hiddenDigits}`;
};

const fetchNotifications = async () => {
  // Mock function to simulate fetching notifications
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([{ id: 1, message: "New transaction completed." }]); // Example notifications
    }, 1000);
  });
};

const Home = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [accountBalance, setAccountBalance] = useState(null);
  const [cardNumber, setCardNumber] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [user, setUser] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // Add refresh logic here
    setRefreshing(false);
  };

  useEffect(() => {
    const getBalanceAndCard = async () => {
      const balance = await fetchAccountBalance();
      const card = await fetchCardNumber();
      const notifications = await fetchNotifications();
      setAccountBalance(balance);
      setCardNumber(card);
      setNotifications(notifications);
      setHasUnreadNotifications(notifications.length > 0);
      setLoading(false);
    };

    getBalanceAndCard();
  }, []);

  const handleNotificationPress = () => {
    setHasUnreadNotifications(false);
    router.navigate("notifications");
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <View className='flex-1'>
        <FlatList
          data={[]}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={({ item }) => (
            <Text className='text-3xl text-white'>{item.id}</Text>
          )}
          ListHeaderComponent={() => (
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
                    <Image
                      source={icons.bell}
                      className='w-7 h-7'
                      contentFit='cover'
                    />
                    {hasUnreadNotifications && (
                      <View className='absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full' />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />

        <Text className='text-white text-2xl font-psemibold ml-3 mb-8'>
          Bienvenue
        </Text>
        <FlatList
          ListHeaderComponent={() => (
            <View className='border-2 border-black-100 rounded-xl px-4 py-8 space-x-2'>
              <View className='flex-row items-start justify-start '>
                <ProfileImagePicker setProfileImage={setProfileImage} />
                <View className='ml-12 mt-1 flex-1'>
                  <Text className='text-xl  font-psemibold text-white'>
                    Dj_Ibm02
                  </Text>
                </View>
              </View>
              {loading ? (
                <ActivityIndicator size='medium' color='#84cc16' />
              ) : (
                <View className='flex-col ml-12 flex-1 mt-1'>
                  <CurrencyDisplay accountBalance={accountBalance} />
                  <View className='ml-6'>
                    <Text className='text-lg text-gray-300'>
                      N° Carte:
                      <Text className='text-white text-xl  text-start font-pmedium'>
                        {formatCardNumber(cardNumber)}
                      </Text>
                    </Text>
                  </View>
                </View>
              )}

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
                    <Text className='text-white font-medium text-base'>
                      Dépot
                    </Text>
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
                    <Text className='text-white font-medium text-base'>
                      Scanner
                    </Text>
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
                    <Text className='text-white font-medium text-base'>
                      Transfert
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
        <View className='w-full relative py-6 px-4 bg-primary border-t-2 border-black-100'>
          <Text className='text-gray-100 text-lg font-pregular mb-3'>PUB</Text>
        </View>
        <ImageSlider />
      </View>
    </SafeAreaView>
  );
};

export default Home;
