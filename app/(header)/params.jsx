import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  Switch,
  Button,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import "nativewind";
import * as ImagePicker from "expo-image-picker";

const Parametre = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [username, setUsername] = useState("Dj_Ibm02");
  const [profileImage, setProfileImage] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("+1234567890");
  const [isUsernameModalVisible, setUsernameModalVisible] = useState(false);
  const [isPhoneNumberModalVisible, setPhoneNumberModalVisible] =
    useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // Add refresh logic here
    setRefreshing(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.uri);
      // Placeholder for API call to update profile image
      Alert.alert("Succès", "La photo de profil a été mise à jour.");
    }
  };

  const handleUsernameSubmit = async () => {
    // Placeholder for API call to update username
    setUsernameModalVisible(false);
    Alert.alert("Succès", "Le nom d'utilisateur a été mis à jour.");
  };

  const handlePhoneNumberSubmit = async () => {
    // Placeholder for API call to update phone number
    setPhoneNumberModalVisible(false);
    Alert.alert("Succès", "Le numéro de téléphone a été mis à jour.");
  };

  const handleNotificationsToggle = async (value) => {
    setNotificationsEnabled(value);
    // Placeholder for API call to update notifications setting
    Alert.alert(
      "Succès",
      `Notifications ${value ? "activées" : "désactivées"}.`
    );
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <View className='flex-1 min-h-[85vh] justify-center mt-12 border-b-[1px] w-full border-black-200'>
        <FlatList
          data={[]}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <Text className='text-3xl text-white'>{item.id}</Text>
          )}
          ListHeaderComponent={() => (
            <View className='my-6 px-4 space-y-6'>
              <View className='space-y-4'>
                <TouchableOpacity
                  onPress={pickImage}
                  className='border-b border-gray-700 py-2'
                >
                  <Text className='text-lg text-gray-400'>
                    Changer la photo de profil
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setUsernameModalVisible(true)}
                  className='border-b border-gray-700 py-2'
                >
                  <Text className='text-lg text-gray-400'>
                    Changer le Nom d'utilisateur
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setPhoneNumberModalVisible(true)}
                  className='border-b border-gray-700 py-2'
                >
                  <Text className='text-lg text-gray-400'>
                    Changer le Numéro de téléphone
                  </Text>
                </TouchableOpacity>
                <View className='flex-row items-center justify-between border-b border-gray-700 py-2'>
                  <Text className='text-lg text-gray-400'>
                    Mute Notifications
                  </Text>
                  <Switch
                    value={notificationsEnabled}
                    onValueChange={handleNotificationsToggle}
                  />
                </View>
              </View>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>

      {/* Username Modal */}
      <Modal
        visible={isUsernameModalVisible}
        transparent={true}
        animationType='slide'
        onRequestClose={() => setUsernameModalVisible(false)}
      >
        <View className='flex-1 justify-center items-center bg-transparent bg-opacity-70'>
          <View className='bg-primary p-6 rounded w-80'>
            <Text className='text-white text-lg mb-4'>
              Changer le nom d'utilisateur
            </Text>
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="Nom d'utilisateur"
              placeholderTextColor='gray'
              className='bg-gray-600 text-white p-2 rounded mb-4'
            />
            <Button title='Enregistrer' onPress={handleUsernameSubmit} />
          </View>
        </View>
      </Modal>

      {/* Phone Number Modal */}
      <Modal
        visible={isPhoneNumberModalVisible}
        transparent={true}
        animationType='slide'
        onRequestClose={() => setPhoneNumberModalVisible(false)}
      >
        <View className='flex-1 justify-center items-center bg-transparent bg-opacity-70'>
          <View className='bg-primary p-6 rounded w-80'>
            <Text className='text-white text-lg mb-4'>
              Changer le numéro de téléphone
            </Text>
            <TextInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder='Numéro de téléphone'
              placeholderTextColor='gray'
              className='bg-gray-700 text-white p-2 rounded mb-4'
              keyboardType='phone-pad'
            />
            <Button title='Enregistrer' onPress={handlePhoneNumberSubmit} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Parametre;
