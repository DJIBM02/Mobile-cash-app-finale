import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import "nativewind";
import ServicesContact from "../../components/ServicesContact";
import SearchInput from "../../components/SearchInput";
import { icons } from "../../constants";
import { Ionicons } from "@expo/vector-icons";

const Create = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contactName, setContactName] = useState("");
  const [existingContact, setExistingContact] = useState(null);
  const [contacts, setContacts] = useState([]);

  const onRefresh = async () => {
    setRefreshing(true);
    // Add refresh logic here
    setRefreshing(false);
  };

  const searchContact = () => {
    // Logic to search contact
    // If contact exists, set it in existingContact
    const foundContact = {
      username: "exampleUser",
      profilePicture: "https://example.com/profile.jpg",
    };
    setExistingContact(foundContact);
  };

  const addContact = () => {
    if (existingContact) {
      setContacts([...contacts, existingContact]);
      setExistingContact(null);
      setContactName("");
      setIsModalVisible(false);
    }
  };

  const deleteContact = (index) => {
    const newContacts = [...contacts];
    newContacts.splice(index, 1);
    setContacts(newContacts);
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <View className='flex-1'>
        <FlatList
          data={contacts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View className='flex-row items-center justify-between px-4 py-2'>
              <View className='flex-row items-center'>
                <Image
                  source={{ uri: item.profilePicture }}
                  className='w-10 h-10 rounded-full'
                  contentFit='cover'
                />
                <Text className='text-lg text-white ml-4'>{item.username}</Text>
              </View>
              <TouchableOpacity onPress={() => deleteContact(index)}>
                <Ionicons name='trash' size={24} color='red' />
              </TouchableOpacity>
            </View>
          )}
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
                  <Image
                    source={icons.useradd}
                    className='w-9 h-9'
                    contentFit='cover'
                  />
                </TouchableOpacity>
              </View>

              <View className='flex-row items-center px-4 my-6'>
                <SearchInput placeholder='Recherche' />
              </View>
              <ServicesContact
                posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []}
              />
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title='Aucun contact trouvé'
              subtitle='Ajoutez des amis'
              buttonTitle={"Ajouté un contact"}
              buttonAction={() => setIsModalVisible(true)}
            />
          )}
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
        <View className='flex-1 justify-center items-center bg-transparent bg-opacity-50'>
          <View className='bg-primary p-5 rounded-lg w-4/5'>
            <View className='flex-row justify-end'>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Ionicons name='close' size={24} color='white' />
              </TouchableOpacity>
            </View>
            <Text className='text-lg font-bold mb-4 text-white'>
              Ajouter un contact
            </Text>
            <TextInput
              value={contactName}
              onChangeText={setContactName}
              placeholder='Nom du contact'
              className='border p-2 rounded mb-4 border-white'
            />
            <TouchableOpacity
              className='bg-secondary p-2 rounded mb-4'
              onPress={searchContact}
            >
              <Text className='text-black text-center'>Rechercher</Text>
            </TouchableOpacity>
            {existingContact && (
              <View className='border p-2 rounded mb-4 flex-row items-center'>
                <Image
                  source={{ uri: existingContact.profilePicture }}
                  className='w-10 h-10 rounded-full'
                  contentFit='cover'
                />
                <Text className='text-lg ml-4 text-white'>
                  {existingContact.username}
                </Text>
              </View>
            )}
            {existingContact && (
              <TouchableOpacity
                className='bg-green-500 p-2 rounded'
                onPress={addContact}
              >
                <Text className='text-white text-center'>Ajouter</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Create;
