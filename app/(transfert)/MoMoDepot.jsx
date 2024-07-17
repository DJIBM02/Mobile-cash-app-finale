// @ts-nocheck
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons"; // Assuming you're using react-i18next for localization
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import ServicesDépot from "./ServicesDépot";
import { router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "nativewind";

const API_ENDPOINT = "http://192.168.43.238:3000/api/transaction/mobile-charge";
const PHONE_REGEX = /^[0-9]{9}$/; // Assumes 9-digit phone numbers, adjust as needed

const MoMo_Dépot = () => {
  const [form, setForm] = useState({ number: "", amount: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [transactionDetails, setTransactionDetails] = useState(null);

  const validateForm = useCallback(() => {
    const errors = {};
    if (!form.number) {
      errors.number = "numberRequired";
    } else if (!PHONE_REGEX.test(form.number)) {
      errors.number = "invalidPhoneNumber";
    }
    if (!form.amount) {
      errors.amount = "amountRequired";
    } else if (isNaN(form.amount) || parseFloat(form.amount) <= 0) {
      errors.amount = "invalidAmount";
    }
    return errors;
  }, [form]);

  const handleInputChange = useCallback((field, value) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  }, []);

  const submitTransaction = useCallback(async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setFormErrors({});

    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        API_ENDPOINT,
        {
          phone: form.number,
          amount: parseFloat(form.amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setTransactionDetails(response.data);
        setIsModalVisible(true);
      }
    } catch (error) {
      console.error("Error making direct charge request:", error);
      setErrorMessage(error.response?.data?.error || "unexpectedError");
      Alert.alert("error", "transactionFailed");
    } finally {
      setIsSubmitting(false);
    }
  }, [form, validateForm]);

  const retryTransaction = useCallback(() => {
    setErrorMessage("");
    submitTransaction();
  }, [submitTransaction]);

  const closeModal = useCallback(() => {
    setIsModalVisible(false);
    setForm({ number: "", amount: "" });
    setTransactionDetails(null);
  }, []);

  const renderTransactionDetails = useCallback(() => {
    if (!transactionDetails) return null;
    return (
      <>
        <Text className='text-black mb-2'>
          {"status"}: {transactionDetails.message}
        </Text>
        <Text className='text-black mb-2'>
          {"transactionId"}: {transactionDetails.transaction_id}
        </Text>
        <Text className='text-black mb-2'>
          {"date"}: {new Date(transactionDetails.created_at).toLocaleString()}
        </Text>
      </>
    );
  }, [transactionDetails]);

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='gap-4 p-4'>
          <View className='flex-row items-center justify-start mb-4'>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name='arrow-back' size={24} color='black' />
            </TouchableOpacity>
            <Text className='text-lg text-black ml-4'>{"mobileRecharge"}</Text>
          </View>
          <ServicesDépot
            title={"makeDeposit"}
            imageSource={images.momo}
            containerStyle='bg-primary'
            titleStyle='text-black'
          />
          <View className='pb-5 w-full px-4'>
            <FormField
              title={"phoneNumber"}
              value={form.number}
              handleChangeText={(e) => handleInputChange("number", e)}
              otherStyles='mt-3'
              keyboardType='numeric'
              errorMessage={formErrors.number}
            />
            <FormField
              title={"amount"}
              value={form.amount}
              handleChangeText={(e) => handleInputChange("amount", e)}
              otherStyles='mt-3'
              keyboardType='numeric'
              errorMessage={formErrors.amount}
            />
          </View>
          {errorMessage ? (
            <Text className='text-red-500 text-center'>{errorMessage}</Text>
          ) : null}
          <CustomButton
            title={"makeDeposit"}
            handlePress={submitTransaction}
            containerStyle='justify-center items-center'
            className='rounded-full bg-blue-500 py-2 px-4 mt-4'
            isLoading={isSubmitting}
          />
          {errorMessage && (
            <CustomButton
              title={"retry"}
              handlePress={retryTransaction}
              containerStyle='justify-center items-center'
              className='rounded-full bg-gray-500 py-2 px-4 mt-2'
            />
          )}
        </View>

        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType='slide'
          onRequestClose={closeModal}
        >
          <View className='flex-1 justify-center items-center bg-transparent bg-opacity-50'>
            <View className='bg-primary p-5 rounded-lg w-4/5'>
              <View className='flex-row justify-end'>
                <TouchableOpacity onPress={closeModal}>
                  <Ionicons name='close' size={24} color='red' />
                </TouchableOpacity>
              </View>
              <Text className='text-green-400 text-xl font-bold mb-4'>
                {"Sucessful depositSummary"}
              </Text>
              <Text className='text-white font-pmedium text-base mb-2'>
                {"amount/FCFA"}: {form.amount}
              </Text>
              <Text className='text-white font-pmedium text-base mb-2'>
                {"phoneNumber"}: {form.number}
              </Text>
            </View>
          </View>
        </Modal>
      </ScrollView>
      {isSubmitting && (
        <View className='absolute inset-0 justify-center items-center bg-black bg-opacity-50'>
          <ActivityIndicator size='large' color='#0000ff' />
        </View>
      )}
    </SafeAreaView>
  );
};

export default MoMo_Dépot;
