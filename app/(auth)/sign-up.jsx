// @ts-nocheck
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import PasswordStrengthIndicator from "./TempFile";
import "nativewind";
import DateTimePicker from "@react-native-community/datetimepicker";
import AntDesign from "@expo/vector-icons/AntDesign";
import FormFieldError from "../../components/FormFieldError";
import { useIP } from "../../data/IPContext";
import axios from "axios";

const Inscription = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: new Date(),
    address: {
      city: "",
      quarter: "",
      country: "",
    },
    email: "",
    phone_number: "+237",
    password: "",
    ConfirmPassword: "",
    pin: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState({});
  const Ipaddress = useIP();

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

  const validateForm = () => {
    const {
      first_name,
      last_name,
      date_of_birth,
      address,
      email,
      phone_number,
      password,
      ConfirmPassword,
      pin,
    } = form;

    let formErrors = {};

    if (!first_name) formErrors.first_name = "Le nom est requis";
    if (!last_name) formErrors.last_name = "Le prénom est requis";
    if (!date_of_birth)
      formErrors.date_of_birth = "La date de naissance est requise";
    if (!address.country) formErrors.country = "Le pays est requis";
    if (!address.city) formErrors.city = "La ville est requise";
    if (!address.quarter) formErrors.quarter = "Le quartier est requis";
    if (!email) formErrors.email = "L'email est requis";
    if (!phone_number)
      formErrors.phone_number = "Le numéro de téléphone est requis";
    if (!password) formErrors.password = "Le mot de passe est requis";
    if (!ConfirmPassword)
      formErrors.ConfirmPassword = "la confirmation de mot de passe est requis";
    if (!pin) formErrors.pin = "Le code PIN est requis";

    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      Alert.alert("Veuillez remplir tous les champs !");
      return false;
    }

    return true;
  };

  const submit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${Ipaddress}/api/user/create`, form, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        Alert.alert("Inscription réussie !");
        router.replace("/sign-in");
      } else {
        Alert.alert("Erreur lors de l'inscription", response.message);
      }
    } catch (error) {
      if (error.response) {
        Alert.alert(
          "Erreur lors de l'inscription",
          error.response.data.message
        );
      } else if (error.request) {
        Alert.alert(
          "Erreur lors de l'inscription",
          "No response from the server. Please check the server status."
        );
      } else {
        Alert.alert("Erreur lors de l'inscription", error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || form.date_of_birth;
    setShowDatePicker(false);
    setForm({ ...form, date_of_birth: currentDate });
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
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
          />

          <Text className='text-2xl text-white font-semibold font-psemibold'>
            Inscription
          </Text>

          <FormField
            title='Nom'
            value={form.first_name}
            handleChangeText={(e) => setForm({ ...form, first_name: e })}
            otherStyles='mt-2'
            keyboardType='default'
          />
          <FormFieldError error={errors.first_name} />

          <FormField
            title='Prénom'
            value={form.last_name}
            handleChangeText={(e) => setForm({ ...form, last_name: e })}
            otherStyles='mt-2'
            keyboardType='default'
          />
          <FormFieldError error={errors.last_name} />

          <View className='mt-2'>
            <Text className='text-white'>Date de naissance</Text>
            <View className='flex-row items-center'>
              <FormField
                value={form.date_of_birth.toDateString()}
                editable={false}
                handleChangeText={() => {}}
                otherStyles='flex-1'
              />
              <TouchableOpacity
                className='bg-indigo-600 mt-6 w-9 h-8 justify-center items-center rounded'
                onPress={() => setShowDatePicker(true)}
              >
                <AntDesign name='calendar' size={30} color='white' />
              </TouchableOpacity>
            </View>
            {showDatePicker && (
              <DateTimePicker
                value={form.date_of_birth}
                mode='date'
                display='default'
                onChange={onChangeDate}
              />
            )}
          </View>
          <FormFieldError error={errors.date_of_birth} />

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
          <FormFieldError error={errors.city} />

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
          <FormFieldError error={errors.quarter} />

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
          <FormFieldError error={errors.country} />

          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles='mt-2'
            keyboardType='email-address'
          />
          <FormFieldError error={errors.email} />

          <View className='mt-2 flex-row items-center'>
            <FormField
              value={form.phone_number}
              handleChangeText={(e) => setForm({ ...form, phone_number: e })}
              otherStyles='mt-2 flex-1'
              keyboardType='phone-pad'
              placeholder='Votre numéro'
            />
          </View>
          <FormFieldError error={errors.phone_number} />

          <FormField
            title='Code Pin'
            value={form.pin}
            handleChangeText={(e) => setForm({ ...form, pin: e })}
            otherStyles='mt-2'
            keyboardType='phone-pad'
            placeholder='Code à 6 chiffres'
          />
          <FormFieldError error={errors.pin} />

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
          <FormFieldError error={errors.password} />
          <PasswordStrengthIndicator strength={passwordStrength} />

          <FormField
            title='Confirmation du Mot de passe'
            value={form.ConfirmPassword}
            handleChangeText={(e) => {
              setForm({ ...form, ConfirmPassword: e });
              setPasswordStrength(getPasswordStrength(e));
            }}
            otherStyles='mt-2'
            secureTextEntry
          />

          <CustomButton
            title='Inscription'
            handlePress={submit}
            containerStyle='mt-1'
            isLoading={isSubmitting}
          />

          <View className='justify-center pt-1 flex-row gap-2'>
            <Text className='text-base text-gray-100 font-medium'>
              Déjà un compte?
            </Text>
            <Link
              href='/sign-in'
              className='text-base font-medium text-secondary underline'
            >
              Connectez-vous
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Inscription;
