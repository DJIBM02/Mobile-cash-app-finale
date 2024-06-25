import { View, Text } from "react-native";
import React from "react";

import { Link } from "expo-router";

const resetpassword2 = () => {
  return (
    <View className='justify-center items-center flex-auto'>
      <Text className='text-base font-pmedium '>
        {" "}
        Votre demande à été bien pris en compte vous allez recevoir un code de
        reinitialisation si "${email}" est associé a un compte MaGeno
      </Text>

      <Text className='font-pregular text-base'>
        {" "}
        Toujours pas reçu d'email?
        <Text className='font-pmedium text-sm'>
          Veuillez reverifier votre couriel où si vous aviez entrez l'e-mail ou
          le nom utilisateur correspondant et{" "}
          <Link
            className='text-sm font-medium text-secondary focus:active: underline '
            href='/resetPassword'
          >
            {" "}
            reéssayez{" "}
          </Link>
        </Text>
      </Text>
    </View>
  );
};

export default resetpassword2;
