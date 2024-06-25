import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";
import { styled } from "nativewind";

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledText = styled(Text);
const StyledLink = styled(Link);

const Connection = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {};

  return (
    <StyledSafeAreaView className='bg-primary flex-1'>
      <ScrollView>
        <StyledView className='w-11/12 mx-auto justify-center min-h-[85vh] px-4 my-4'>
          <StyledImage
            source={images.logo}
            resizeMode='contain'
            className='w-24 h-16'
            alt='MaGeNo Logo'
          />

          <StyledText className='text-2xl text-white font-semibold font-psemibold'>
            Connectez-vous à MaGeNo
          </StyledText>

          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles='mt-4'
            keyboardType='email-address'
          />

          <StyledView className='flex justify-end items-end mt-1'>
            <StyledText className='text-gray-100'>(Optionnel)</StyledText>
          </StyledView>

          <FormField
            title='Mot de passe'
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles='mt-4'
            secureTextEntry
          />

          <StyledView className='flex justify-end pt-1'>
            <StyledLink
              href='/resetPassword'
              className='text-secondary-100 underline mt-1'
            >
              Mot de passe oublié?
            </StyledLink>
          </StyledView>

          <CustomButton
            title='Connexion'
            handlePress={submit}
            containerStyle='mt-3'
            isLoading={isSubmitting}
          />

          <StyledView className='flex justify-center pt-4 flex-row gap-2'>
            <StyledText className='text-base text-gray-100 font-medium'>
              Créer un compte?
            </StyledText>
            <StyledLink
              href='/sign-up'
              className='text-base font-medium text-secondary underline'
            >
              Inscrivez-vous
            </StyledLink>
          </StyledView>
        </StyledView>
      </ScrollView>
    </StyledSafeAreaView>
  );
};

export default Connection;
