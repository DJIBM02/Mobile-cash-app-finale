import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import "nativewind";
import ServicesContact from "../../components/ServicesContact";

const profile = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // Ajoutez la logique de rafraîchissement ici
    setRefreshing(false);
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <View className='flex-1 border-b-[1px] border-black-200 '>
        <FlatList
          data={[]}
          keyExtractor={(item) => item.$id} // Correction ici
          renderItem={({ item }) => (
            <Text className='text-3xl text-white'>{item.id}</Text> // Correction ici
          )}
          ListHeaderComponent={() => (
            <View className='my-6 px-4 space-y-6'>
              <View className='justify-between items-start flex-row mb-6 '>
                <Text className='font-pmedium text-lg text-gray-100'>
                  Profile
                </Text>
              </View>
              <View className='flex-row items-center px-4 my-6'></View>
              <ServicesContact
                posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []}
              />
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default profile;
