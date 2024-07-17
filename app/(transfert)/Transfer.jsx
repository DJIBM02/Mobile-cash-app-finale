import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, Text, ScrollView, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { useRouter, useGlobalSearchParams } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Constants
const API_BASE_URL = "http://192.168.1.198:3000/api";
const ERROR_MESSAGES = {
  NO_TOKEN: "No authentication token found. Please log in again.",
  MISSING_FIELDS: "Receiver email and amount are required.",
  NETWORK_ERROR: "Network error. Please check your connection and try again.",
  UNKNOWN_ERROR: "An unknown error occurred. Please try again later.",
};

const Transfer = () => {
  const router = useRouter();
  const { contact } = useGlobalSearchParams();
  const contactData = useMemo(
    () => (contact ? JSON.parse(contact) : null),
    [contact]
  );

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
        `${API_BASE_URL}/transaction/create`,
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
        `${API_BASE_URL}/transaction/confirm/${transactionId}`,
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
        <View className='flex-1 justify-center items-center bg-transparent bg-opacity-50'>
          <View className='bg-primary p-5 rounded-lg w-4/5'>
            <Text className='text-xl text-white font-bold mb-4'>
              Confirm Transaction
            </Text>
            <Text className='text-md text-white font-psemibold mb-4'>
              Receveur: {form.receiverEmail}
            </Text>
            <Text className='text-md text-white font-psemibold mb-4'>
              Montant: {form.amount}
            </Text>
            <FormField
              title='PIN'
              value={form.pin}
              handleChangeText={(e) => handleInputChange("pin", e)}
              keyboardType='numeric'
              secureTextEntry={true}
            />
            <CustomButton
              title='Confirm'
              handlePress={handleTransactionConfirmation}
              containerStyle='mt-3'
              isLoading={isSubmitting}
            />
            <CustomButton
              title='Cancel'
              handlePress={() => setModalVisible(false)}
              containerStyle='mt-2'
              type='secondary'
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Transfer;
