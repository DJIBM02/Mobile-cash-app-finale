import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import ServicesDépot from "./ServicesDépot";
import { router } from "expo-router";
import "nativewind";

const MoMo_Dépot = ({}) => {
  const [form, setForm] = useState({
    email: "",
    montant: "",
    number: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const submit = () => {
    // Show the modal on submit
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    // Reset form and submission state if needed
    setForm({ email: "", montant: "", number: "" });
    setIsSubmitting(false);
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='gap-2'>
          <View className='flex-row items-center justify-start p-4'>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name='arrow-back' size={24} color='black' />
            </TouchableOpacity>

            <Text className='text-lg text-black ml-4'>Recharge par Mobile</Text>
          </View>
          <View className='items-center'>
            <ServicesDépot
              title='Faire un dépot'
              imageSource={images.momo}
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
                title='Numéro'
                value={form.number}
                handleChangeText={(e) => setForm({ ...form, number: e })}
                otherStyles='mt-3'
                keyboardType='numeric'
              />
            </View>
          </View>
          <CustomButton
            title='faire le dépot'
            handlePress={setIsModalVisible}
            containerStyle='justify-center'
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
                <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                  <Ionicons name='close' size={24} color='white' />
                </TouchableOpacity>
              </View>

              <Text className='text-white text-lg font-bold mb-4'>
                Résumé du dépot
              </Text>
              <Text className='text-white mb-2'>Montant: {form.montant}</Text>
              <Text className='text-white mb-2'>
                N° de télèphone: {form.number}
              </Text>
              <CustomButton
                title='Fermer'
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

export default MoMo_Dépot;
