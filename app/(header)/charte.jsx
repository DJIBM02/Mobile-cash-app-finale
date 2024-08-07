// @ts-nocheck
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PieChart } from "react-native-chart-kit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import "nativewind";
import CustomButton from "../../components/CustomButton";
import EmptyState from "../../components/EmptyState";
import { router } from "expo-router";
import { useIP } from "../../data/IPContext";

const API_BASE_URL = "http://192.168.43.238:3000/api";

const Charte = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [timeframe, setTimeframe] = useState("all");
  const [totalReceived, setTotalReceived] = useState(0);
  const [totalSent, setTotalSent] = useState(0);
  const [receivedPercentage, setReceivedPercentage] = useState(0);
  const [sentPercentage, setSentPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const Ipaddress = useIP();
  const fetchData = async (url) => {
    setIsLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("No token found");
      console.log("Fetching data from:", url); // Debug log
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Response:", response.data); // Debug log
      return response.data;
    } catch (error) {
      console.error("Failed to fetch data:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
      setError(error.message || "An error occurred while fetching data");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const processTransactionData = (data) => {
    const {
      total_received_Transaction = 0,
      total_sent_Transaction = 0,
      received_transactions = [],
      sent_transactions = [],
      sent_percentage = 0,
      received_percentage = 0,
    } = data;

    setTotalReceived(parseFloat(total_received_Transaction));
    setTotalSent(parseFloat(total_sent_Transaction));
    setReceivedPercentage(received_percentage);
    setSentPercentage(sent_percentage);
    setTransactions(
      [...received_transactions, ...sent_transactions].sort(
        (a, b) => new Date(b.created) - new Date(a.created)
      )
    );
    setChartData([
      {
        name: "Entrées",
        amount: received_percentage || 0,
        color: "#4CAF50",
        legendFontColor: "#fff",
        legendFontSize: 12,
      },
      {
        name: "Sorties",
        amount: sent_percentage || 0,
        color: "#FF5252",
        legendFontColor: "#fff",
        legendFontSize: 12,
      },
    ]);
  };

  const fetchTransactions = async () => {
    try {
      let url = `${Ipaddress}/api/transactions`;
      if (timeframe !== "all") {
        url = `${Ipaddress}/api/transactions/filter/${timeframe}`;
      }
      const data = await fetchData(url);
      processTransactionData(data);
    } catch (error) {
      console.error("Error fetching transactions:", error.message);
      Alert.alert("Error", `Failed to fetch transactions: ${error.message}`);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTransactions();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchTransactions();
    }, [])
  );

  useEffect(() => {
    fetchTransactions();
  }, [timeframe]);

  const formatAmount = (amount) => {
    return (
      amount?.toLocaleString("fr-FR", {
        style: "currency",
        currency: "XAF",
      }) || "0 FCFA"
    );
  };

  const renderTransaction = ({ item }) => (
    <View className='flex-row justify-between items-center py-3 border-b border-gray-700'>
      <View>
        <Text className='text-white font-medium'>
          {new Date(item.created).toLocaleDateString()}
        </Text>
        <Text className='text-gray-400 text-xs'>
          {new Date(item.created).toLocaleTimeString()}
        </Text>
      </View>
      <Text
        className={`text-base ${
          item.senders_id ? "text-red-500" : "text-green-500"
        }`}
      >
        {item.senders_id ? "-" : "+"}
        {formatAmount(parseFloat(item.amount.$numberDecimal))}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className='bg-primary flex-1'>
      <View className='flex-1 p-4'>
        <Text className='font-bold text-2xl text-gray-100 mb-6'>
          Statistiques Financières
        </Text>

        {isLoading ? (
          <ActivityIndicator size='large' color='#6366f1' />
        ) : error ? (
          <Text className='text-red-500 text-center'>{error}</Text>
        ) : (
          <>
            <View className='bg-gray-800 rounded-lg p-4 mb-6'>
              <PieChart
                data={chartData}
                width={Dimensions.get("window").width - 50}
                height={200}
                chartConfig={{
                  backgroundColor: "#1e1e1e",
                  backgroundGradientFrom: "#1e1e1e",
                  backgroundGradientTo: "#1e1e1e",
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                }}
                accessor='amount'
                backgroundColor='transparent'
                paddingLeft='15'
                absolute
              />
            </View>

            <View className='flex-row justify-around mb-6'>
              <View className='items-center'>
                <Text className='text-green-500 text-lg font-bold'>
                  ↑ Entrées
                </Text>
                <Text className='text-white'>
                  {formatAmount(totalReceived)} (
                  {receivedPercentage?.toFixed(2)}
                  %)
                </Text>
              </View>
              <View className='items-center'>
                <Text className='text-red-500 text-lg font-bold'>
                  ↓ Sorties
                </Text>
                <Text className='text-white'>
                  {formatAmount(totalSent)} ({sentPercentage?.toFixed(2)}%)
                </Text>
              </View>
            </View>

            <View className='flex-row justify-around mb-4'>
              {["all", "daily", "weekly", "monthly"].map((tf) => (
                <TouchableOpacity
                  key={tf}
                  onPress={() => setTimeframe(tf)}
                  className={`py-2 px-4 rounded-full ${
                    timeframe === tf ? "bg-indigo-600" : "bg-gray-700"
                  }`}
                >
                  <Text className='text-white capitalize'>{tf}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <FlatList
              data={transactions}
              keyExtractor={(item) => item._id.toString()}
              renderItem={renderTransaction}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={["#6366f1"]}
                />
              }
              ListEmptyComponent={
                <EmptyState
                  title='Aucune transaction trouvée'
                  subtitle='Commencez une transaction'
                  buttonTitle={"Allez à la page de transaction"}
                  buttonAction={() => router.push("/Transfer")}
                />
              }
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Charte;
