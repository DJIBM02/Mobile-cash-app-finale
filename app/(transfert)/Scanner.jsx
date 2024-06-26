import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Camera, CameraView } from "expo-camera";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
// Import Ionicons from expo vector icons
import "nativewind";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setCameraVisible(false);
    const isSuccess = true; // Replace with actual logic
    if (isSuccess) {
      router.push("/TransactionSuccess");
    } else {
      router.push("/TransactionFailed");
    }
  };

  const handlePayButtonPress = () => {
    setCameraVisible(true);
  };

  const handleCancelPress = () => {
    setCameraVisible(false);
  };

  if (hasPermission === null) {
    return <ActivityIndicator />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView className='bg-primary flex-1 justify-center items-center'>
      {cameraVisible ? (
        <>
          <CameraView
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ flex: 1, width: "100%" }}
            animateShutter={true}
          />
          <View className='absolute top-0 bottom-0 left-0 right-0 justify-center items-center'>
            <View className='border-4 border-dashed border-white w-64 h-64 rounded-lg'>
              {/* Add broken border effect */}
              <View className='absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-white' />
              <View className='absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-white' />
              <View className='absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-white' />
              <View className='absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-white' />
            </View>
          </View>
          <View className='absolute bottom-8  right-8'>
            <TouchableOpacity
              className='bg-neutral-600 rounded-full justify-center items-center w-16 h-12'
              onPress={handleCancelPress}
            >
              <Feather name='x' size={30} color='white' />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View className='flex-col items-center'>
          <Text className='text-2xl text-white font-bold text-center mb-4'>
            Scannez pour
            <Text className='text-green-500'> payer </Text>
            ou
            <Text className='text-blue-500'> demande </Text>
          </Text>

          <TouchableOpacity
            className='bg-gray-800 mt-4 rounded-2xl min-h-[55px] w-[180px] justify-center items-center'
            onPress={handlePayButtonPress}
          >
            <Text className='text-green-500 font-pmedium text-lg'>Payé</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className='bg-gray-800 mt-4 rounded-2xl min-h-[55px] w-[180px] justify-center items-center'
            onPress={() => router.push("/TransactionFailed")}
          >
            <Text className='text-blue-500 font-pmedium text-lg'>Demande</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
