import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import ServicesDépot from "./ServicesDépot";
import { router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ScrollView } from "react-native";
import "nativewind";

const Visa_Dépot = () => {
  const [form, setForm] = useState({
    email: "",
    montant: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const submit = () => {
    // Show the modal on submit
    setIsModalVisible(true);
  };

  const confirmSubmit = () => {
    // Handle the final submission logic here
    setIsSubmitting(true);
    setIsModalVisible(false);
    // Simulate a network request
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form after submission
      setForm({
        email: "",
        montant: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
      });
    }, 2000);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(Platform.OS === "ios");

    const formattedDate = `${currentDate.getMonth() + 1}/${currentDate
      .getFullYear()
      .toString()
      .slice(-2)}`;
    setForm({ ...form, expiryDate: formattedDate });
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='gap-2'>
          <View className='flex-row items-center justify-start p-4'>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name='arrow-back' size={24} color='black' />
            </TouchableOpacity>
            <Text className='text-lg text-black ml-4'>
              Faire un dépot par carte bancaire
            </Text>
          </View>
          <View className='items-center'>
            <ServicesDépot
              title='Faire un dépot'
              imageSource={images.VISA}
              containerStyle='bg-primary'
              titleStyle='text-black'
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
                title='Numéro de carte'
                value={form.cardNumber}
                handleChangeText={(e) => setForm({ ...form, cardNumber: e })}
                otherStyles='mt-3'
                keyboardType='numeric'
              />
              <View className='flex-row justify-around relative'>
                <Text className='text-m top-3 left-14 text-gray-100 font-pmedium'>
                  Date d'expiration
                </Text>
                <TouchableOpacity
                  className='w-4/12 top-5 mr-12 right-16'
                  onPress={() => setShowDatePicker(true)}
                >
                  <FormField
                    value={form.expiryDate}
                    handleChangeText={() => {}}
                    otherStyles='w-[150px]'
                    placeholder='MM/AA'
                    editable={false} // Make the text input read-only
                  />
                </TouchableOpacity>

                <FormField
                  title='CVV'
                  value={form.cvv}
                  handleChangeText={(e) => setForm({ ...form, cvv: e })}
                  otherStyles='mt-3 w-4/12'
                  keyboardType='numeric'
                  secureTextEntry={true}
                />
              </View>
            </View>
          </View>
          <CustomButton
            title='faire le dépot'
            handlePress={submit}
            containerStyle='mt-3'
            isLoading={isSubmitting}
          />
        </View>

        {/* Modal for Summary */}
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType='slide'
          onRequestClose={closeModal}
        >
          <View className='flex-1 justify-center items-center bg-primary'>
            <View className='bg-primary p-5 rounded-lg w-4/5'>
              <View className='flex-row justify-end'>
                <TouchableOpacity onPress={closeModal}>
                  <Ionicons name='close' size={24} color='black' />
                </TouchableOpacity>
              </View>
              <Text className='text-lg text-white font-bold mb-4'>
                Résumé du dépot
              </Text>
              <Text className='mb-2 text-white'>Montant: {form.montant}</Text>
              <Text className='mb-2 text-white'>
                Numéro de carte: {form.cardNumber}
              </Text>
              <Text className='mb-2 text-white'>
                Date d'expiration: {form.expiryDate}
              </Text>
              <Text className='mb-2 text-white'>CVV: {form.cvv}</Text>
              <CustomButton
                title='Soumettre'
                handlePress={confirmSubmit}
                containerStyle='mt-3'
                isLoading={isSubmitting}
              />
            </View>
          </View>
        </Modal>

        {/* Date Picker */}
        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode='date'
            display='default'
            onChange={handleDateChange}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Visa_Dépot;
