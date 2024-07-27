// @ts-nocheck
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "nativewind";

const RequestPage = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [username, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get("http://192.168.43.238:3000/api/user/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { data } = res;
      setUser(data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to fetch user data. Please try again.");
    }
  };

  const fetchQRCode = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        "http://192.168.43.238:3000/api/qr-code",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data && response.data.url) {
        setQrCodeUrl(response.data.url);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching QR code:", error);
      setError(
        `Failed to fetch QR code. ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getData();
        await fetchQRCode();
      } catch (error) {
        console.error("Error in fetchData:", error);
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
    }
  }, [error]);

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className='min-h-[85vh] justify-center items-center w-full px-4'>
          <Text className='text-2xl text-green-500 font-bold mb-4'>MaGeNo</Text>
          {loading ? (
            <ActivityIndicator size='large' color='#00ff00' />
          ) : error ? (
            <Text className='text-red-500 text-center'>{error}</Text>
          ) : (
            <>
              {username && (
                <Text className='text-lg font-psemibold text-white mb-4'>
                  {username.first_name} {username.last_name}
                </Text>
              )}
              {qrCodeUrl ? (
                <Image
                  source={{ uri: `http://192.168.43.238:3000${qrCodeUrl}` }}
                  style={{ width: 200, height: 200 }}
                  onError={(e) =>
                    console.error("Image loading error:", e.nativeEvent.error)
                  }
                />
              ) : (
                <Text className='text-white mt-4'>QR code not available</Text>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RequestPage;
