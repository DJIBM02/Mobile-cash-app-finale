// @ts-nocheck
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import "nativewind";
import { useIP } from "../../data/IPContext";

const Litige = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const Ipaddress = useIP();

  const handleSubmit = async () => {
    if (title.trim() === "" || description.trim() === "") {
      Alert.alert("Erreur", "Tous les champs sont obligatoires.");
      return;
    }

    setIsSubmitting(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        `${Ipaddress}/api/litigation/create`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert("Succès", response.data.message);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Échec de la création du litige:", error);
      Alert.alert("Erreur", "Impossible de créer le litige.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-gray-900'>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className='flex-1'
      >
        <ScrollView className='flex-grow px-4 py-6'>
          <View className='bg-gray-800 rounded-lg shadow-lg p-6 mb-6'>
            <Text className='text-3xl font-bold text-white mb-8 text-center'>
              Créer un Litige
            </Text>
            <View className='mb-6'>
              <Text className='text-lg font-semibold text-gray-300 mb-2'>
                Titre
              </Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder='Entrez le titre du litige'
                placeholderTextColor='#9CA3AF'
                className='bg-gray-700 text-white py-3 px-4 rounded-lg text-base'
              />
            </View>
            <View className='mb-8'>
              <Text className='text-lg font-semibold text-gray-300 mb-2'>
                Description
              </Text>
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Décrivez le litige et incluez l'ID de la transaction"
                placeholderTextColor='#9CA3AF'
                className='bg-gray-700 text-white py-3 px-4 rounded-lg text-base h-32'
                multiline
                numberOfLines={6}
                textAlignVertical='top'
              />
            </View>
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isSubmitting}
              className={`flex-row items-center justify-center py-4 px-6 rounded-lg ${
                isSubmitting ? "bg-green-700" : "bg-green-600"
              }`}
            >
              <Ionicons name='send-outline' size={24} color='white' />
              <Text className='text-white font-bold text-lg ml-2'>
                {isSubmitting ? "Envoi en cours..." : "Soumettre le Litige"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Litige;
