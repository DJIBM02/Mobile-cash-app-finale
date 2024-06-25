import { View, Text, Image, ScrollView, Modal, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import "nativewind";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";

const Dépot = ({}) => {
  const [form, setForm] = useState({
    dépot: "",
    userName: "",
    pin: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [isPinInputVisible, setIsPinInputVisible] = useState(false);

  const submit = () => {
    // Show the custom numeric keyboard for PIN input
    setIsPinInputVisible(true);
  };

  const handleTransactionSubmit = async () => {
    setIsSubmitting(true);
    // Simulate a network request
    setTimeout(() => {
      setIsSubmitting(false);
      const success = Math.random() > 0.5; // Simulate success or failure
      setTransactionStatus(success ? "success" : "failure");
      setIsModalVisible(false);
      if (success) {
        router.navigate("/TransactionSuccess");
      } else {
        router.navigate("/TransactionFailure");
      }
    }, 2000);
  };

  const handlePinInput = (pin) => {
    if (pin.length <= 6) {
      setForm({ ...form, pin });
    }
  };

  return (
    <SafeAreaView className='bg-primary flex-1'>
      <ScrollView>
        <View className='w-11/12 mx-auto justify-center min-h-[85vh] px-4 my-4'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-24 h-16'
            alt='MaGeNo Logo'
          />

          <Text className='text-2xl text-white font-semibold font-psemibold'>
            Faire un Dépot
          </Text>

          <FormField
            title='Montant'
            value={form.dépot}
            handleChangeText={(e) => setForm({ ...form, dépot: e })}
            otherStyles='mt-4'
            keyboardType='numeric'
          />

          <FormField
            title='userName'
            value={form.userName}
            handleChangeText={(e) => setForm({ ...form, userName: e })}
            otherStyles='mt-4'
          />

          {!isPinInputVisible && (
            <CustomButton
              title='envoyé'
              handlePress={submit}
              containerStyle='mt-3'
              isLoading={isSubmitting}
            />
          )}

          {isPinInputVisible && (
            <View className='mt-4'>
              <Text className='text-lg text-white mb-2'>
                Entrez le code PIN
              </Text>
              <TextInput
                style={{
                  height: 40,
                  borderColor: "gray",
                  borderWidth: 1,
                  backgroundColor: "white",
                  paddingHorizontal: 8,
                }}
                value={form.pin}
                onChangeText={handlePinInput}
                keyboardType='numeric'
                maxLength={6}
                secureTextEntry={true}
              />
              <CustomButton
                title='Submit'
                handlePress={() => setIsModalVisible(true)}
                containerStyle='mt-3'
                isLoading={isSubmitting}
              />
            </View>
          )}
        </View>
      </ScrollView>

      {/* ModalllScrollView for Transaction Summary */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType='slide'
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className='flex-1 justify-center items-center bg-black bg-opacity-50'>
          <View className='bg-white p-5 rounded-lg w-4/5'>
            <Text className='text-lg font-bold mb-4'>Résumé du dépot</Text>
            <Text className='mb-2'>Montant: {form.dépot}</Text>
            <Text className='mb-2'>Nom d'utilisateur: {form.userName}</Text>
            <Text className='mb-2'>Code Pin: {form.pin}</Text>
            <CustomButton
              title='Submit'
              handlePress={handleTransactionSubmit}
              containerStyle='mt-3'
              isLoading={isSubmitting}
            />
            <TouchableOpacity
              className='absolute top-2 right-2'
              onPress={() => setIsModalVisible(false)}
            >
              <Text className='text-lg text-red-500'>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Dépot;
