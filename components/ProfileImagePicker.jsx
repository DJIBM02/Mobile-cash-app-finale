import React, { useState } from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import "nativewind";
import { Ionicons } from "@expo/vector-icons";

const ProfileImagePicker = ({ setProfileImage }) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Denied",
        "Permission to access camera roll is required!"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View className='items-center justify-center absolute -top-6 -left-3'>
      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <Image
            source={{ uri: image }}
            className='w-20 h-20 rounded-full'
            contentFit='cover'
            alt='Profile Image'
          />
        ) : (
          <View className='w-25 h-25 rounded-full bg-gray-200 justify-center items-center mt-8'>
            <Ionicons name='camera' size={50} color='gray' />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ProfileImagePicker;
