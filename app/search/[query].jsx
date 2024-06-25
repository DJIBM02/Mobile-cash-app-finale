import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import { FlatList } from "react-native-gesture-handler";

const Search = () => {
  const { query } = useLocalSearchParams();

  useEffect(() => {}, [query]);

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        keyExtractor={(item) => index.toString()}
        renderItem={({ item, index }) => (
          <View className='flex-row items-center justify-between px-4 py-2'>
            <View className='flex-row items-center'>
              <Image
                source={{ uri: item.profilePicture }}
                className='w-10 h-10 rounded-full'
                contentFit='cover'
              />
            </View>
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View className='flex my-6 px-4'>
              <Text className='font-pmedium text-gray-100 text-sm'>
                Resultat de la recherche
              </Text>
              <Text className='text-2xl font-psemibold text-white mt-1'>
                {query}
              </Text>
              <Text className='text-lg text-white ml-4'>{item.username}</Text>
              <View className='mt-6 mb-8'>
                <SearchInput initialQuery={query} refetch={refetch} />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='Aucun contact enregistré avec le nom trouvé'
            subtitle='Ajouté'
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
