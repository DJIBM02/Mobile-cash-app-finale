import React, { useState, useEffect } from "react";
import { View, Text, FlatList, RefreshControl, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PieChart } from "react-native-chart-kit";
import "nativewind";

const Charte = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const onRefresh = async () => {
    setRefreshing(true);
    // Mock refresh logic here
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network request
    setTransactions(mockTransactions());
    setRefreshing(false);
  };

  useEffect(() => {
    // Mocking the transactions data
    setTransactions(mockTransactions());
  }, []);

  // Mock transactions data
  const mockTransactions = () => [
    { id: 1, date: "2024-05-23 14:23", amount: "+200.00" },
    { id: 2, date: "2024-05-21 11:11", amount: "-50.00" },
    { id: 3, date: "2024-05-19 16:45", amount: "+150.00" },
    { id: 4, date: "2024-05-15 08:30", amount: "-30.00" },
    { id: 5, date: "2024-05-13 09:22", amount: "+300.00" },
    { id: 6, date: "2024-05-10 12:35", amount: "-20.00" },
  ];

  const data = [
    {
      name: "Entrées",
      amount: 650,
      color: "#4CAF50",
      legendFontColor: "#fff",
      legendFontSize: 15,
    },
    {
      name: "Sorties",
      amount: 100,
      color: "#FF5252",
      legendFontColor: "#fff",
      legendFontSize: 15,
    },
  ];

  return (
    <SafeAreaView className='bg-primary h-full '>
      <View className='flex-1  p-4'>
        <View className='my-6 space-y-6 border-b-[1px] border-black-200'>
          <Text className='font-pmedium text-lg text-gray-100'>Charte</Text>
          <PieChart
            data={data}
            width={Dimensions.get("window").width - 50}
            height={220}
            chartConfig={{
              backgroundColor: "#161622",
              backgroundGradientFrom: "#1E1E2F",
              backgroundGradientTo: "#6366f1",
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            accessor='amount'
            backgroundColor='transparent'
            paddingLeft='15'
            absolute
          />
          <View className='flex-row justify-between items-center mt-4 border-t border-gray-600 pt-4'>
            <Text className='text-white'>Entrées</Text>
            <Text className='text-green-500 text-2xl'>↑</Text>
          </View>
          <View className='flex-row justify-between items-center mb-4 border-b border-gray-600 pb-4'>
            <Text className='text-white'>Sorties</Text>
            <Text className='text-red-500 text-2xl'>↓</Text>
          </View>
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View className='flex-row justify-between items-center py-2 border-b border-gray-700'>
                <Text className='text-white'>{item.date}</Text>
                <Text className='text-white'>{item.amount}FcFa</Text>
              </View>
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Charte;
