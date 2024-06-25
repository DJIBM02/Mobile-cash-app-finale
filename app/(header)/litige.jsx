import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "nativewind";
import { Image } from "expo-image";
import { icons } from "../../constants";
import Ionicons from "@expo/vector-icons/Ionicons";

// Mock function to send message to API/Database
const sendMessageToApi = async (message) => {
  // Replace this with actual API call
  console.log("Sending message to API:", message);
};

// Mock function to fetch messages from API/Database
const fetchMessagesFromApi = async () => {
  // Replace this with actual API call
  return [
    {
      id: 1,
      text: "Déposez votre plainte ici avec les preuves comme les screenshots de transactions .......etc",
      sender: "system",
    },
  ];
};

const Litige = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const loadMessages = async () => {
      const initialMessages = await fetchMessagesFromApi();
      setMessages(initialMessages);
    };

    loadMessages();
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
    };

    setMessages([...messages, message]);
    setNewMessage("");

    await sendMessageToApi(message);
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <View className='flex-1 border-b-[1px] border-black-200'>
        <View className='my-6 px-4 space-y-6 border-b-[1px] border-black-200 mt-2'>
          <View className='justify-between items-start flex-row mb-6'>
            <Text className='font-pmedium text-lg text-gray-100'>Litige</Text>
            <Image
              source={icons.court}
              className='w-10 h-10 mb-0'
              contentFit='cover'
            />
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "Android" ? "padding" : "height"}
          className='flex-1'
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
            {messages.map((message) => (
              <View
                key={message.id}
                className={`p-3 my-2 rounded-xl ${
                  message.sender === "user"
                    ? "bg-blue-500 self-end"
                    : "bg-gray-700 self-start"
                }`}
              >
                <Text className='text-white'>{message.text}</Text>
              </View>
            ))}
          </ScrollView>
          <View className='flex-row items-center border-t border-gray-500 p-3'>
            <TextInput
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder='Tapez votre message'
              className='flex-1 bg-gray-500 p-3 rounded-xl'
            />
            <TouchableOpacity
              onPress={handleSendMessage}
              className='ml-2 bg-blue-500 p-3 rounded-xl'
            >
              <Ionicons name='send-outline' size={24} color='white' />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Litige;
