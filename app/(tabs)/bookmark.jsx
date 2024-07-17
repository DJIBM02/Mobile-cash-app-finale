import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { useState } from "react";
import EmptyState from "../../components/EmptyState";
import "nativewind";

import { router } from "expo-router";

const Create = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // Ajoutez la logique de rafraîchissement ici
    setRefreshing(false);
  };

  return (
    <View className='bg-primary h-full'>
      <View className='flex-1  '>
        <FlatList
          data={[]}
          keyExtractor={(item) => item.$id} // Correction ici
          renderItem={({ item }) => (
            <Text className='text-3xl text-white'>{item.id}</Text> // Correction ici
          )}
          ListHeaderComponent={() => (
            <View className='my-6 px-  space-y-6 '>
              <View className='justify-between items-start flex-row mb-6 border-b-[1px] border-gray-700'>
                <Text className='font-pmedium text-lg mb-4 text-gray-100'>
                  Historique des transactions
                </Text>
              </View>
              <View className='flex-row items-center px-4 my-6'></View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title='Aucune transaction repertorié'
              subtitle='Commencé une transaction'
              buttonTitle={"Ajouté une transaction"}
              buttonAction={() => router.push("/Transfer")}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
};

export default Create;
