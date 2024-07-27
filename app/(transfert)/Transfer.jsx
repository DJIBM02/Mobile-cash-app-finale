// @ts-nocheck
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, Text, ScrollView, Modal, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { useRouter, useGlobalSearchParams } from "expo-router";
import axios from "axios";
import { useIP } from "../../data/IPContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Constants
const ERROR_MESSAGES = {
  NO_TOKEN: "No authentication token found. Please log in again.",
  MISSING_FIELDS: "Receiver email and amount are required.",
  NETWORK_ERROR: "Network error. Please check your connection and try again.",
  UNKNOWN_ERROR: "An unknown error occurred. Please try again later.",
};

// Custom close icon component
const CloseIcon = () => (
  <Text style={{ fontSize: 24, fontWeight: "bold", color: "red" }}>×</Text>
);

const Transfer = () => {
  const router = useRouter();
  const { contact } = useGlobalSearchParams();
  const contactData = useMemo(
    () => (contact ? JSON.parse(contact) : null),
    [contact]
  );
  const Ipaddress = useIP();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    receiverEmail: "",
    amount: "",
    pin: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [transactionId, setTransactionId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (contactData) {
      setForm((prevForm) => ({
        ...prevForm,
        receiverEmail: contactData.email || "",
      }));
    }
  }, [contactData]);

  useEffect(() => {
    const isValid = form.receiverEmail && form.amount;
    setIsFormValid(isValid);
  }, [form.receiverEmail, form.amount]);

  const handleInputChange = useCallback((field, value) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
  }, []);

  const validateForm = () => {
    if (!form.receiverEmail || !form.amount) {
      throw new Error(ERROR_MESSAGES.MISSING_FIELDS);
    }
  };

  const createTransaction = async (token) => {
    try {
      const response = await axios.post(
        `${Ipaddress}/api/transaction/create`,
        {
          receiver: form.receiverEmail,
          amount: parseFloat(form.amount),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error;
    }
  };

  const handleTransfer = async () => {
    try {
      setIsSubmitting(true);
      setErrorMessage("");

      validateForm();

      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error(ERROR_MESSAGES.NO_TOKEN);

      const data = await createTransaction(token);

      setTransactionId(data.transaction_id);
      setModalVisible(true);
    } catch (error) {
      console.error("Error creating transaction:", error);
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          ERROR_MESSAGES.UNKNOWN_ERROR
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTransactionConfirmation = async () => {
    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error(ERROR_MESSAGES.NO_TOKEN);

      const response = await axios.put(
        `${Ipaddress}/api/transaction/confirm/${transactionId}`,
        { pin: form.pin },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setModalVisible(false);
        router.push("/TransactionSuccess");
      } else {
        throw new Error("Failed to confirm transaction.");
      }
    } catch (error) {
      console.error("Error confirming transaction:", error);
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          ERROR_MESSAGES.UNKNOWN_ERROR
      );
      setModalVisible(false);
      router.push("/TransactionFailed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSubmitDisabled = useMemo(() => {
    return !isFormValid || isSubmitting;
  }, [isFormValid, isSubmitting]);

  return (
    <SafeAreaView className='bg-primary flex-1'>
      <ScrollView>
        <View className='w-11/12 mx-auto justify-center min-h-[85vh] px-4 my-4'>
          <Text className='text-2xl text-white font-semibold font-psemibold'>
            Faire un Transfert
          </Text>

          {errorMessage && (
            <Text className='text-red-500 mt-2'>{errorMessage}</Text>
          )}

          <FormField
            title='E-mail du receveur'
            value={form.receiverEmail}
            handleChangeText={(e) => handleInputChange("receiverEmail", e)}
            otherStyles='mt-4'
          />

          <FormField
            title='Amount'
            value={form.amount}
            handleChangeText={(e) => handleInputChange("amount", e)}
            otherStyles='mt-4'
            keyboardType='numeric'
          />

          <CustomButton
            title='Submit'
            handlePress={handleTransfer}
            containerStyle='mt-3'
            isLoading={isSubmitting}
            disabled={isSubmitDisabled}
          />
        </View>
      </ScrollView>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className='flex-1 justify-center items-center bg-neutral bg-opacity-50'>
          <View className='bg-primary p-6 rounded-2xl w-11/12 max-w-md'>
            <View className='flex-row justify-between items-center mb-4'>
              <Text className='text-2xl font-bold text-white'>
                Confirm Transaction
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className='p-2'
              >
                <CloseIcon />
              </TouchableOpacity>
            </View>

            <View className='bg-gray-400 p-4 rounded-lg mb-4'>
              <Text className='text-lg text-gray-600 mb-2'>
                Receiver:{" "}
                <Text className='font-bold text-primary'>
                  {form.receiverEmail}
                </Text>
              </Text>
              <Text className='text-lg text-gray-600'>
                Amount/FCFA:{" "}
                <Text className='font-bold text-primary'>{form.amount}</Text>
              </Text>
            </View>

            <FormField
              title='Enter your PIN'
              value={form.pin}
              handleChangeText={(e) => handleInputChange("pin", e)}
              keyboardType='numeric'
              secureTextEntry={true}
              otherStyles='mb-4'
            />

            <CustomButton
              title='Confirm Transfer'
              handlePress={handleTransactionConfirmation}
              containerStyle='mt-2'
              isLoading={isSubmitting}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Transfer;
