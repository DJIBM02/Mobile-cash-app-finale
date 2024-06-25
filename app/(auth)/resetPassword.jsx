import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import "nativewind";
import CustomButton from "../../components/CustomButton";

const resetpassword = () => {
  const [form, setForm] = useState({
    email: "",
    number: "+237",
    password: "",
    userName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    // Add your submission logic here
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center  min-h-[85vh] px-4 my-4'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[100px] h-[65px]'
          />

          <Text className='text-2xl text-white font-semibold font-psemibold pb-3'>
            Reinitialiser votre Mot de passe
          </Text>

          <Text className='text-m text-white font-medium font-psemibold pt-2'>
            Entrez un e-mail ou un nom utilisateur valide pour recevoir les
            instructions de reinitialisation
          </Text>

          <FormField
            title='E-mail ou Nom utilisateur'
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles='mt-4'
            keyboardType='email-address'
          />

          <FormField
            title='N° de Téléphone'
            value={form.number}
            handleChangeText={(e) => setForm({ ...form, number: e })}
            otherStyles='mt-4'
            keyboardType='phone-pad'
            size={12}
          />

          <View
            className='justify-end items-end
          '
          >
            <Text className='text-gray-100 mt-1'> (Optionel)</Text>
          </View>

          <CustomButton
            title='envoyé'
            handlePress={submit}
            containerStyle='mt-3'
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default resetpassword;
