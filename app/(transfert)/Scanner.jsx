// @ts-nocheck
// Scanner.js
import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { Camera, CameraView } from "expo-camera";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import "nativewind";

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [scannedUserId, setScannedUserId] = useState(null);
  const router = useRouter();

  const pulseAnim = useRef(new Animated.Value(0)).current;
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      console.log("Camera permission status:", status);
      setHasPermission(status === "granted");
    };
    getCameraPermissions();
  }, []);

  useEffect(() => {
    if (cameraVisible) {
      // Pulse animation
      Animated.loop(
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        })
      ).start();

      // Scan line animation
      Animated.loop(
        Animated.timing(scanLineAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      pulseAnim.setValue(0);
      scanLineAnim.setValue(0);
    }
  }, [cameraVisible]);

  const handleBarCodeScanned = ({ type, data }) => {
    console.log("handleBarCodeScanned called");
    console.log("QR Code scanned:", type, data);
    setScanned(true);
    setCameraVisible(false);
    setScannedUserId(data);
    router.navigate(`/TransactionModal?id=${data}`);
  };

  const handlePayButtonPress = () => {
    console.log("Pay button pressed, opening camera");
    setCameraVisible(true);
    setScanned(false);
  };

  const handleCancelPress = () => {
    console.log("Cancel button pressed");
    setCameraVisible(false);
    setScanned(false);
  };

  const scannerFrameStyle = {
    transform: [
      {
        scale: pulseAnim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 1.05, 1],
        }),
      },
    ],
    opacity: pulseAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.8, 1, 0.8],
    }),
  };

  const scanLineStyle = {
    transform: [
      {
        translateY: scanLineAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 240], // Adjust based on your frame size
        }),
      },
    ],
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
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ flex: 1, width: "100%" }}
            barCodeScannerSettings={{
              barCodeTypes: ["qr"],
            }}
          />
          <View className='absolute top-0 bottom-0 left-0 right-0 justify-center items-center'>
            <Animated.View style={scannerFrameStyle}>
              <View className='border-4 border-dashed border-white w-64 h-64 rounded-lg overflow-hidden'>
                <View className='absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-white' />
                <View className='absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-white' />
                <View className='absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-white' />
                <View className='absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-white' />
                <Animated.View
                  style={[
                    {
                      width: "100%",
                      height: 2,
                      backgroundColor: "rgba(0, 255, 0, 0.5)",
                    },
                    scanLineStyle,
                  ]}
                />
              </View>
            </Animated.View>
          </View>
          <View className='absolute bottom-8 right-8'>
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
            onPress={() => router.push("/RequestPage")}
          >
            <Text className='text-blue-500 font-pmedium text-lg'>Demande</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
