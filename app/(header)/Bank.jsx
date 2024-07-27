// @ts-nocheck
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import ServicesDépot from "../(transfert)/ServicesDépot";
import { router, useFocusEffect } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "nativewind";

const DépotBancaire = () => {
  const [form, setForm] = useState({
    number: "",
    montant: "",
    cvv: "",
    exp_date: new Date(),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const fetchCreditCard = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        "http://192.168.43.238:3000/api/creditcards",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data && response.data.length > 0) {
        const card = response.data[0];
        setForm((prevForm) => ({
          ...prevForm,
          number: card.number.replace(/\s/g, "").trim(),
          cvv: card.cvv,
        }));
      }
    } catch (error) {
      console.error("Failed to fetch credit card data: ", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchCreditCard();
    }, [fetchCreditCard])
  );

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || form.exp_date;
    setShowDatePicker(false);
    setForm({ ...form, exp_date: currentDate });
  };

  const submit = async () => {
    setIsSubmitting(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        "http://192.168.43.238:3000/api/transaction/carte-charge",
        {
          number: form.number,
          cvv: form.cvv,
          exp_date: form.exp_date.toISOString().split("T")[0],
          amount: form.montant,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        Alert.alert("Success", "Recharge successful");
        closeModal();
      } else {
        Alert.alert("Error", "Failed to recharge. Please try again.");
      }
    } catch (error) {
      console.error("Failed to perform transaction: ", error);
      Alert.alert(
        "Error",
        "An error occurred during the transaction. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setForm({ number: "", montant: "", cvv: "", exp_date: new Date() });
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <View className='flex-1 justify-center items-center bg-primary'>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    );
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='gap-2'>
          <View className='flex-row items-center justify-start p-4 border-b-black-200'>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name='arrow-back' size={24} color='white' />
            </TouchableOpacity>
            <Text className='text-lg text-white ml-4'>Recharge par Carte</Text>
          </View>
          <View className='items-center'>
            <ServicesDépot
              title='Faire un dépot'
              imageSource={images.atmcard}
              containerStyle='bg-primary'
              titleStyle='text-white'
            />
            <View className='pb-5 w-full px-4'>
              <FormField
                title='Montant'
                value={form.montant}
                handleChangeText={(e) => setForm({ ...form, montant: e })}
                otherStyles='mt-3'
                keyboardType='numeric'
              />
              <FormField
                title='Numéro de la carte'
                value={form.number}
                handleChangeText={(e) => setForm({ ...form, number: e })}
                otherStyles='mt-3'
                keyboardType='numeric'
              />
              <FormField
                title='CVV'
                value={form.cvv}
                handleChangeText={(e) => setForm({ ...form, cvv: e })}
                otherStyles='mt-3'
                keyboardType='numeric'
                secureTextEntry
              />
              <View className='mt-2'>
                <Text className='text-white'>Date d'expiration</Text>
                <View className='flex-row items-center'>
                  <FormField
                    value={form.exp_date.toDateString()}
                    editable={false}
                    handleChangeText={() => {}}
                    otherStyles='flex-1'
                  />
                  <TouchableOpacity
                    className='bg-indigo-600 mt-6 w-9 h-8 justify-center items-center rounded'
                    onPress={() => setShowDatePicker(true)}
                  >
                    <AntDesign name='calendar' size={24} color='white' />
                  </TouchableOpacity>
                </View>
                {showDatePicker && (
                  <DateTimePicker
                    value={form.exp_date}
                    mode='date'
                    display='default'
                    onChange={handleDateChange}
                  />
                )}
              </View>
            </View>
          </View>
          <CustomButton
            title='faire le dépot'
            handlePress={() => setIsModalVisible(true)}
            containerStyle='justify-center items-center ml-4'
            className='rounded-r-full'
          />
        </View>

        {/* Modal for Summary */}
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType='slide'
          onRequestClose={closeModal}
        >
          <View className='flex-1 justify-center items-center bg-transparent'>
            <View className='bg-primary p-5 rounded-lg w-4/5'>
              <View className='flex-row justify-end'>
                <TouchableOpacity onPress={closeModal}>
                  <Ionicons name='close' size={24} color='white' />
                </TouchableOpacity>
              </View>
              <Text className='text-white text-lg font-bold mb-4'>
                Résumé du dépot
              </Text>
              <Text className='text-white mb-2'>Montant: {form.montant}</Text>
              <Text className='text-white mb-2'>
                N° de carte: {form.number}
              </Text>
              <Text className='text-white mb-2'>
                Date d'expiration: {form.exp_date.toDateString()}
              </Text>
              <CustomButton
                title='Envoyer'
                handlePress={submit}
                containerStyle='mt-3'
                isLoading={isSubmitting}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DépotBancaire;
