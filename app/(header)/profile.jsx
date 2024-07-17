// @ts-nocheck
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../constants";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "nativewind";

const fetchUserProfile = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        profileImage: images.profile, // Replace with the actual image source
        username: "Dj_Ibm02",
        email: "dj_ibm02@example.com",
        phoneNumber: "+1234567890",
        cardNumber: "1234567890123456",
      });
    }, 1000);
  });
};

const formatCardNumber = (number, reveal) => {
  if (!number) return "";
  return reveal
    ? number
    : `${number.slice(0, 4)}${number.slice(4).replace(/./g, "*")}`;
};

const Profile = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [profile, setProfile] = useState({});
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const onRefresh = async () => {
    setRefreshing(true);
    const userProfile = await fetchUserProfile();
    setProfile(userProfile);
    setRefreshing(false);
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const toggleCardNumberVisibility = () => {
    setShowCardNumber(!showCardNumber);
  };

  const handleLogout = async () => {
    Alert.alert("Déconnexion", "Voulez-vous vraiment vous déconnecter?", [
      {
        text: "Annuler",
        style: "cancel",
      },
      {
        text: "Déconnecter",
        onPress: async () => {
          await AsyncStorage.setItem("isLoggedIn", "false");
          router.push("/sign-in");
        },
      },
    ]);
  };

  return (
    <SafeAreaView className='bg-primary h-full justify-center items-center'>
      <View className='w-3/4 bg-primary'>
        <FlatList
          data={[]}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <Text className='text-3xl text-white'>{item.id}</Text>
          )}
          ListHeaderComponent={() => (
            <View className='my-6 px-4 space-y-6 items-center'>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image
                  source={profile.profileImage}
                  className='w-32 h-32 rounded-full mb-6'
                />
              </TouchableOpacity>
              <Text className='text-2xl font-psemibold text-white'>
                {profile.username}
              </Text>
              <Text className='text-lg text-gray-300'>{profile.email}</Text>
              <Text className='text-lg text-gray-300'>
                {profile.phoneNumber}
              </Text>
              <TouchableOpacity
                className='flex-row items-center'
                onPress={toggleCardNumberVisibility}
              >
                <Text className='text-lg text-gray-300'>
                  N° Carte:{" "}
                  <Text className='text-white text-xl font-pmedium'>
                    {formatCardNumber(profile.cardNumber, showCardNumber)}
                  </Text>
                </Text>
                <Image
                  source={showCardNumber ? icons.eyeHide : icons.eye}
                  className='ml-2 w-5 h-5'
                />
              </TouchableOpacity>
              <TouchableOpacity
                className='bg-gray-800 mt-4 rounded-xl justify-center items-center w-12 h-12'
                onPress={handleLogout}
              >
                <Image
                  source={icons.logout}
                  className='w-9 h-9'
                  resizeMode='contain'
                />
              </TouchableOpacity>
              <Text className='font-pmedium text-white mt-1'>
                Se déconnecter
              </Text>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
      <Modal animationType='slide' visible={modalVisible} transparent={true}>
        <View className='flex-1 justify-center items-center bg-black bg-opacity-70'>
          <TouchableOpacity
            className='absolute top-10 right-10'
            onPress={() => setModalVisible(false)}
          >
            <Text className='text-white text-2xl'>×</Text>
          </TouchableOpacity>
          <Image
            source={profile.profileImage}
            className='w-96 h-96'
            resizeMode='contain'
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Profile;
