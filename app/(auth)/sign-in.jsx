import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";
import "nativewind";

const Connection = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {};

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
            Connectez-vous à MaGeNo
          </Text>

          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles='mt-4'
            keyboardType='email-address'
          />

          <View className='flex justify-end items-end mt-1'>
            <Text className='text-gray-100'>(Optionnel)</Text>
          </View>

          <FormField
            title='Mot de passe'
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles='mt-4'
            secureTextEntry
          />

          <View className='flex justify-end pt-1'>
            <Link
              href='/resetPassword'
              className='text-secondary-100 underline mt-1'
            >
              Mot de passe oublié?
            </Link>
          </View>

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
