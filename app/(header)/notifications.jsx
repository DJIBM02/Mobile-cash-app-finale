import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import "nativewind";
import ServicesContact from "../../components/ServicesContact";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { router } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";

const notifications = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // Ajoutez la logique de rafraîchissement ici
    setRefreshing(false);
  };
  const headerHeight = useHeaderHeight();

  return (
    <SafeAreaView
      style={{ paddingTop: headerHeight }}
      className='bg-primary h-full  border border-black-200 '
    >
      <View className='flex-1 '>
        <FlatList
          data={[]}
          keyExtractor={(item) => item.$id} // Correction ici
          renderItem={({ item }) => (
            <Text className='text-3xl text-white'>{item.id}</Text> // Correction ici
          )}
          ListHeaderComponent={() => (
            <View className='my-6 px-4 space-y-6'>
              <ServicesContact posts={[] ?? []} />
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title='Aucune notification'
              subtitle='commencez des activités'
              buttonTitle={"Aller à la page d'accueil"}
              buttonAction={() => router.push("/home")}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default notifications;
