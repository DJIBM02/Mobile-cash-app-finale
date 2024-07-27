// @ts-nocheck
import React, { useState } from "react";
import { View, Text, Image, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../data/useLoggedInStatus"; // adjust the import path
import { useIP } from "../../data/IPContext";
import "nativewind";

const Connection = () => {
  const [form, setForm] = useState({
    credentials: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();
  const ipAddress = useIP(); // Directly get the IP address

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const validateForm = () => {
    if (!form.credentials || !form.password) {
      setError("Both email and password are required.");
      return false;
    }
    return true;
  };

  const submit = async () => {
    if (!validateForm()) {
      return;
    }

    console.log("form data:", form);

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(`${ipAddress}/api/user/login`, form, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const { token } = response.data;

        // Store the token in AsyncStorage
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        setSuccessMessage("Logged in successfully");
        router.push("/home");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Wrong credentials. Please try again.");
      } else {
        setError(
          err.response?.data?.error ||
            "An error occurred during login please try again."
        );
      }
      console.log("error", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className='bg-primary flex-1'>
      <ScrollView>
        <View
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
          className='w-11/12 mx-auto justify-center min-h-[85vh] px-4 my-4'
        >
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-24 h-16'
            alt='MaGeNo Logo'
          />

          <Text className='text-2xl text-white font-semibold font-psemibold'>
            Connectez-vous à MaGeNo
          </Text>

          <FormField
            title='Email'
            value={form.credentials}
            handleChangeText={(e) => handleInputChange("credentials", e)}
            otherStyles='mt-4'
            keyboardType='email-address'
          />

          <FormField
            title='Mot de passe'
            value={form.password}
            handleChangeText={(e) => handleInputChange("password", e)}
            otherStyles='mt-4'
            secureTextEntry
          />

          <View className='items-end justify-end pt-1'>
            <Link
              href='/resetPassword'
              className='text-secondary-100 underline mt-1'
            >
              Mot de passe oublié?
            </Link>
          </View>

          {error && (
            <Text className='text-white mt-2 bg-red-500 p-2 rounded'>
              {error}
            </Text>
          )}

          {successMessage && (
            <Text className='text-white mt-2 bg-green-500 p-2 rounded'>
              {successMessage}
            </Text>
          )}

          <CustomButton
            title='Connexion'
            handlePress={submit}
            containerStyle='mt-3'
            isLoading={isSubmitting}
          />

          <View className='flex justify-center pt-4 flex-row gap-2'>
            <Text className='text-base text-gray-100 font-medium'>
              Créer un compte?
            </Text>
            <Link
              href='/sign-up'
              className='text-base font-medium text-secondary underline'
            >
              Inscrivez-vous
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Connection;
