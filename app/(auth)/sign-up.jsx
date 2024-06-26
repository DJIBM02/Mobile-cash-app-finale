import React, { useState } from "react";
import { View, Text, Image, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";
import PasswordStrengthIndicator from "./TempFile";
import { styled } from "nativewind";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Alert } from "react-native";

const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const Inscription = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: new Date(),
    address: {
      country: "",
      city: "",
      quarter: "",
    },
    email: "",
    number: "+237",
    password: "",
    pin: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    if (strength >= 4) return "fort";
    if (strength === 3) return "medium";
    return "faible";
  };

  const submit = () => {
    setIsSubmitting(true);
    // Add your API call or submission logic here
    setIsSubmitting(false);
    if (form.password !== form.confirmPassword) {
      Alert.alert("Veuillez entrer les mêmes mots de passe !");
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || form.date_of_birth;
    setShowDatePicker(false);
    setForm({ ...form, date_of_birth: currentDate });
  };

  return (
    <StyledSafeAreaView className='bg-primary h-full'>
      <StyledScrollView>
        <StyledView className='w-11/12 mx-auto justify-center min-h-[85vh] px-4 my-4'>
          <StyledImage
            source={images.logo}
            resizeMode='contain'
            className='w-24 h-16'
          />

          <StyledText className='text-2xl text-white font-semibold font-psemibold'>
            Inscription
          </StyledText>

          <FormField
            title='Nom'
            value={form.first_name}
            handleChangeText={(e) => setForm({ ...form, first_name: e })}
            otherStyles='mt-2'
            keyboardType='default'
          />

          <FormField
            title='Prénom'
            value={form.last_name}
            handleChangeText={(e) => setForm({ ...form, last_name: e })}
            otherStyles='mt-2'
            keyboardType='default'
          />

          <StyledView className='mt-2'>
            <StyledText className='text-white'>Date de naissance</StyledText>
            <StyledView className='flex-row items-center'>
              <FormField
                value={form.date_of_birth.toDateString()}
                editable={false}
                handleChangeText={() => {}}
                otherStyles='flex-1'
              />
              <CustomButton
                title='Sélectionner'
                handlePress={() => setShowDatePicker(true)}
              />
            </StyledView>
            {showDatePicker && (
              <DateTimePicker
                value={form.date_of_birth}
                mode='date'
                display='default'
                onChange={onChangeDate}
              />
            )}
          </StyledView>

          <FormField
            title='Pays'
            value={form.address.country}
            handleChangeText={(e) =>
              setForm({
                ...form,
                address: { ...form.address, country: e },
              })
            }
            otherStyles='mt-2'
            keyboardType='default'
          />

          <FormField
            title='Ville'
            value={form.address.city}
            handleChangeText={(e) =>
              setForm({
                ...form,
                address: { ...form.address, city: e },
              })
            }
            otherStyles='mt-2'
            keyboardType='default'
          />

          <FormField
            title='Adresse de résidence'
            value={form.address.quarter}
            handleChangeText={(e) =>
              setForm({
                ...form,
                address: { ...form.address, quarter: e },
              })
            }
            otherStyles='mt-2'
            keyboardType='default'
          />

          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles='mt-2'
            keyboardType='email-address'
          />

          <StyledView className='mt-2 flex-row items-center'>
            <FormField
              value={form.number}
              handleChangeText={(e) => setForm({ ...form, number: e })}
              otherStyles='mt-2 flex-1'
              keyboardType='phone-pad'
              placeholder='Votre numéro'
            />
          </StyledView>

          <FormField
            title='Code Pin'
            value={form.pin}
            handleChangeText={(e) => setForm({ ...form, pin: e })}
            otherStyles='mt-2'
            keyboardType='phone-pad'
            placeholder='Code à 6 chiffres'
          />

          <StyledView className='justify-end items-end'>
            <StyledText className='text-gray-100 mt-1'>(Optionnel)</StyledText>
          </StyledView>

          <FormField
            title='Mot de passe'
            value={form.password}
            handleChangeText={(e) => {
              setForm({ ...form, password: e });
              setPasswordStrength(getPasswordStrength(e));
            }}
            otherStyles='mt-2'
            secureTextEntry
          />
          <PasswordStrengthIndicator strength={passwordStrength} />
          <FormField
            title='Confirmer le mot de passe'
            value={form.confirmPassword}
            handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
            otherStyles='mt-2'
            secureTextEntry
          />

          <PasswordStrengthIndicator strength={passwordStrength} />

          <CustomButton
            title='Inscription'
            handlePress={submit}
            containerStyle='mt-1'
            isLoading={isSubmitting}
          />

          <StyledView className='justify-center pt-1 flex-row gap-2'>
            <StyledText className='text-base text-gray-100 font-medium'>
              Déjà un compte?
            </StyledText>
            <Link
              href='/sign-in'
              className='text-base font-medium text-secondary underline'
            >
              Connectez-vous
            </Link>
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
};

export default Inscription;
