import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import "nativewind";
import ServicesContact from "../../components/ServicesContact";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { router } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";

const transactions = [
  {
    id: 1,
    status: "Transaction Successful",
    date: "2023-06-24",
    time: "12:34",
    details: "Transaction ID: 12345",
    amount: "$100",
    recipient: "User A",
  },
  {
    id: 2,
    status: "Transaction Failed",
    date: "2023-06-23",
    time: "14:56",
    details: "Transaction ID: 67890",
    amount: "$50",
    recipient: "User B",
  },
  // Add more transactions here
];

const Notifications = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const onRefresh = async () => {
    setRefreshing(true);
    // Add refresh logic here
    setRefreshing(false);
  };
  const headerHeight = useHeaderHeight();

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <SafeAreaView
      style={{ paddingTop: headerHeight }}
      className='bg-primary h-full border border-black-200'
    >
      <View className='flex-1'>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className='bg-gray-800 p-4 m-2 rounded'>
              <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                <View className='flex-row justify-between items-center'>
                  <Text className='text-xl font-semibold text-white'>
                    {item.status}
                  </Text>
                  <Text className='text-lg font-semibold text-gray-300'>
                    {item.date} {item.time}
                  </Text>
                </View>
              </TouchableOpacity>
              {expandedId === item.id && (
                <View className='mt-2'>
                  <Text className='text-lg text-gray-300'>{item.details}</Text>
                  <Text className='text-lg text-gray-300'>
                    Amount: {item.amount}
                  </Text>
                  <Text className='text-lg text-gray-300'>
                    Recipient: {item.recipient}
                  </Text>
                </View>
              )}
            </View>
          )}
          ListHeaderComponent={() => (
            <View className='my-6 px-4 space-y-6'>
              <ServicesContact posts={[]} />
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title='Aucune notification'
              subtitle='commencez des activités'
              buttonTitle="Aller à la page d'accueil"
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

export default Notifications;
