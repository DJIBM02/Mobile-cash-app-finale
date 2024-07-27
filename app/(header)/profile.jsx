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
import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../constants";
import { useFocusEffect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIP } from "../../data/IPContext";
import "nativewind";
import axios from "axios";

const Profile = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const Ipaddress = useIP();

  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${Ipaddress}/api/user/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("User data:", response.data);
      const { data } = response;
      setLoading(false);
      setUser(data.user);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserProfile();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserProfile();
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
                  source={profile.profileImage || images.profile}
                  className='w-32 h-32 rounded-full mb-6'
                />
              </TouchableOpacity>
              <Text className='text-2xl font-psemibold text-white'>
                {user?.first_name} {user?.last_name}
              </Text>
              <Text className='text-lg text-gray-300'>{user?.email}</Text>
              <Text className='text-lg text-gray-300'>
                {user?.phone_number}
              </Text>
              <Text className='text-base font-pregular text-gray-300 mt-2'>
                Date: {user?.created}
              </Text>
              <TouchableOpacity
                className='flex-row items-center'
                onPress={toggleCardNumberVisibility}
              >
                <Text className='text-base font-pregular text-white mt-2'>
                  Balance:{" "}
                  {showCardNumber
                    ? `${
                        user?.wallet?.account_balance?.$numberDecimal || "0"
                      } ${user?.wallet?.currency}`
                    : "********"}
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
            source={profile.profileImage || images.profile}
            className='w-96 h-96'
            resizeMode='contain'
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Profile;
