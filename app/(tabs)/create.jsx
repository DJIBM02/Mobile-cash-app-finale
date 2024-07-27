// @ts-nocheck
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import "nativewind";
import { Image } from "expo-image";
import { images } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useIP } from "../../data/IPContext";
import ReactNativeModal from "react-native-modal";

const Create = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contactId, setContactId] = useState("");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageZoomVisible, setImageZoomVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const Ipaddress = useIP();

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.get(`${Ipaddress}/api/contacts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(response.data || []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      Alert.alert("Error", "Failed to fetch contacts.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchContacts();
    }, [fetchContacts])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchContacts();
  };

  const addContact = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.post(
        `http://192.168.43.238:3000/api/contact/add/${contactId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data?.contact) {
        setContacts((prevContacts) => [...prevContacts, response.data.contact]);
        Alert.alert("Success", "Contact added successfully.");
      } else {
        Alert.alert("Info", response.data.message || "Contact was not added.");
      }
      setContactId("");
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error adding contact:", error);
      Alert.alert("Error", "Failed to add contact. Please try again.");
    }
  }, [contactId]);

  const renderContactItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        className='flex-row items-center justify-between px-4 py-2'
        activeOpacity={0.8}
        onPress={() =>
          router.navigate({
            pathname: "/Transfer",
            params: { contact: JSON.stringify(item) },
          })
        }
      >
        <View className='flex-row items-center'>
          <TouchableOpacity
            onPress={() => {
              setSelectedImage(images.profile);
              setImageZoomVisible(true);
            }}
          >
            <Image
              source={images.profile}
              className='w-10 h-10 rounded-md'
              contentFit='cover'
            />
          </TouchableOpacity>
          <View className='ml-4 border-b-black-200'>
            <Text className='text-lg font-bold text-gray-200'>
              {item.first_name} {item.last_name}
            </Text>
            <Text className='text-sm text-gray-500'>{item.email}</Text>
            <Text className='text-sm text-gray-500'>{item.phone}</Text>
          </View>
        </View>
      </TouchableOpacity>
    ),
    []
  );

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  if (loading) {
    return (
      <View className='flex-1 justify-center items-center bg-primary'>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    );
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <View className='flex-1'>
        <FlatList
          data={contacts}
          keyExtractor={keyExtractor}
          renderItem={renderContactItem}
          ListHeaderComponent={() => (
            <View className='my-6 px-4 space-y-6'>
              <View className='justify-between items-start flex-row mb-2 border-b-[1px] border-gray-700'>
                <Text className='font-pmedium text-lg text-gray-100'>
                  Contact
                </Text>
                <TouchableOpacity
                  className='w-10 h-10 mb-2 mr-3 bg-black-200 rounded-full justify-center items-center'
                  onPress={() => setIsModalVisible(true)}
                >
                  <Ionicons name='add' size={24} color='white' />
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={() =>
            !contacts.length && (
              <EmptyState
                title='Aucun contact trouvé'
                subtitle='Ajoutez des amis'
                buttonTitle={"Ajouté un contact"}
                buttonAction={() => setIsModalVisible(true)}
              />
            )
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>

      {/* Modal for Adding Contact */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType='slide'
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className='flex-1 justify-center items-center border-gray-600 bg-transparent bg-opacity-50'>
          <View className='bg-primary p-5 rounded-lg w-4/5'>
            <View className='flex-row justify-end'>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Ionicons name='close' size={24} color='red' />
              </TouchableOpacity>
            </View>
            <Text className='text-lg font-bold mb-4 text-white'>
              Ajouter un contact
            </Text>
            <TextInput
              value={contactId}
              onChangeText={setContactId}
              placeholder='ID du contact'
              placeholderTextColor={"white"}
              className='border p-2 rounded mb-4 border-white text-white'
            />
            <TouchableOpacity
              className='bg-green-500 p-2 rounded'
              onPress={addContact}
            >
              <Text className='text-white text-center'>Ajouter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for Image Zoom */}
      <ReactNativeModal
        isVisible={imageZoomVisible}
        onBackdropPress={() => setImageZoomVisible(false)}
        onBackButtonPress={() => setImageZoomVisible(false)}
        style={{ margin: 0, justifyContent: "center", alignItems: "center" }}
        animationIn={"fadeInLeft"}
        animationOut={"fadeOutLeft"}
      >
        <View className='bg-white p-5 rounded-lg'>
          <Image
            source={selectedImage}
            className='w-80 h-80 rounded-md'
            contentFit='cover'
          />
          <TouchableOpacity
            className='mt-4 p-2 bg-gray-500 rounded'
            onPress={() => setImageZoomVisible(false)}
          >
            <Text className='text-white text-center'>Close</Text>
          </TouchableOpacity>
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
};

export default Create;
