// @ts-nocheck
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter, useGlobalSearchParams } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "nativewind";
import { useIP } from "../../data/IPContext"; // Adjust the path to your IPContext

export default function TransactionModal() {
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentModal, setCurrentModal] = useState("create"); // 'create' or 'confirm'
  const [transactionId, setTransactionId] = useState(null);
  const { id } = useGlobalSearchParams();
  const router = useRouter();
  const IpAddress = useIP(); // Use the IP address from the context

  const handleCreateTransaction = async () => {
    if (!amount) {
      Alert.alert("Error", "Please enter the amount");
      return;
    }

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("token");
      console.log("Initiating transaction for user:", id);

      // Create transaction
      const createResponse = await axios.post(
        `${IpAddress}/api/transaction/create/${id}`,
        {
          amount: parseFloat(amount),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (createResponse.data && createResponse.data.transaction_id) {
        console.log("Transaction created:", createResponse.data.transaction_id);
        setTransactionId(createResponse.data.transaction_id);
        setCurrentModal("confirm");
      } else {
        console.error("Transaction creation failed");
        Alert.alert("Error", "Transaction creation failed");
      }
    } catch (error) {
      console.error("Transaction error:", error.response || error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "An error occurred"
      );
    } finally {
      setLoading(false);
      setAmount("");
    }
  };

  const handleConfirmTransaction = async () => {
    if (!pin) {
      Alert.alert("Error", "Please enter the PIN");
      return;
    }

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("token");

      // Confirm transaction
      const confirmResponse = await axios.put(
        `${IpAddress}/api/transaction/confirm/${transactionId}`,
        {
          pin,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (confirmResponse.status == 200) {
        console.log("Transaction confirmed successfully");
        setCurrentModal(false);
        router.push("/TransactionSuccess");
      } else {
        console.error("Transaction confirmation failed");
        router.push("/TransactionFailed");
      }
    } catch (error) {
      console.error("Transaction error:", error.response || error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "An error occurred"
      );
    } finally {
      setLoading(false);
      setPin("");
    }
  };

  return (
    <View className='flex-1 justify-center items-center bg-black bg-opacity-50'>
      {currentModal === "create" && (
        <View className='bg-primary p-8 rounded-lg w-4/5'>
          <Text className='text-xl font-bold mb-4 text-white'>
            Enter Transaction Amount
          </Text>
          <TextInput
            className='border-2 border-gray-500 rounded-md p-2 mb-4'
            placeholder='Amount'
            placeholderTextColor={"white"}
            keyboardType='numeric'
            value={amount}
            onChangeText={setAmount}
          />
          <TouchableOpacity
            className='bg-green-500 rounded-md p-3 items-center'
            onPress={handleCreateTransaction}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color='blue' size='small' />
            ) : (
              <Text className='text-white font-bold'>Create Transaction</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {currentModal === "confirm" && (
        <View className='bg-primary p-8 rounded-lg w-4/5'>
          <Text className='text-xl font-bold mb-4 text-white'>
            Confirm Transaction
          </Text>
          <TextInput
            className='border-2 border-gray-500 rounded-md p-2 mb-4'
            placeholder='PIN'
            placeholderTextColor={"white"}
            secureTextEntry
            keyboardType='numeric'
            value={pin}
            onChangeText={setPin}
          />
          <TouchableOpacity
            className='bg-green-500 rounded-md p-3 items-center'
            onPress={handleConfirmTransaction}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color='blue' size='small' />
            ) : (
              <Text className='text-white font-bold'>Confirm Transaction</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
