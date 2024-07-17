import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "nativewind";
import EmptyState from "../../components/EmptyState";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        "http://192.168.43.238:3000/api/notifications",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotifications(response.data.notification || []);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchNotifications();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchNotifications();
  };

  const openModal = (notification) => {
    setSelectedNotification(notification);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedNotification(null);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const headerHeight = useHeaderHeight();

  if (isLoading) {
    return (
      <View className='flex-1 justify-center items-center bg-indigo-500'>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    );
  }

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      className={`bg-gray-400 rounded-lg mx-4 my-2 p-4 shadow ${
        item.read ? "opacity-70" : "bg-blue-50"
      }`}
      onPress={() => openModal(item)}
    >
      <View className='flex-1'>
        <Text className='text-base font-semibold text-gray-800 mb-1'>
          {item.title}
        </Text>
        <Text className='text-sm text-gray-600 mb-2' numberOfLines={2}>
          {item.description}
        </Text>
        <Text className='text-xs text-gray-400'>
          {new Date(item.date).toLocaleString()}
        </Text>
      </View>
      {!item.read && (
        <View className='w-2 h-2 rounded-full bg-blue-500 absolute top-4 right-4' />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      className='flex-1 bg-primary'
      style={{ paddingTop: headerHeight }}
    >
      <FlatList
        data={notifications}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderNotificationItem}
        ListEmptyComponent={() => (
          <EmptyState
            title='No notifications'
            subtitle='Start some activities'
            buttonTitle='Go to Home'
            buttonAction={() => router.push("/home")}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          notifications.length > 0 && (
            <TouchableOpacity
              className='self-end px-4 py-2 mb-2'
              onPress={markAllAsRead}
            >
              <Text className='text-blue-500 font-psemibold'>
                Mark all as read
              </Text>
            </TouchableOpacity>
          )
        }
      />

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType='slide'
        onRequestClose={closeModal}
      >
        <View className='flex-1 justify-center items-center bg-transparent bg-opacity-50'>
          <View className='bg-primary rounded-2xl p-6 w-11/12 max-h-4/5'>
            <TouchableOpacity className='self-end mb-4' onPress={closeModal}>
              <Ionicons name='close' size={24} color='red' />
            </TouchableOpacity>
            {selectedNotification && (
              <>
                <Text className='text-xl font-bold text-gray-400 mb-3'>
                  {selectedNotification.title}
                </Text>
                <Text className='text-base text-gray-500 mb-4'>
                  {selectedNotification.description}
                </Text>
                <Text className='text-sm text-gray-400'>
                  {new Date(selectedNotification.date).toLocaleString()}
                </Text>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Notifications;
