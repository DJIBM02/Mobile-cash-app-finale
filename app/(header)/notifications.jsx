// @ts-nocheck
import React, { useState, useCallback, useMemo } from "react";
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
import { useIP } from "../../data/IPContext";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const Ipaddress = useIP();

  const fetchNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${Ipaddress}/api/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNotifications();
  }, []);

  const openModal = useCallback((notification) => {
    setSelectedNotification(notification);
    setIsModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalVisible(false);
    setSelectedNotification(null);
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((n) => ({ ...n, read: true }))
    );
  }, []);

  const headerHeight = useHeaderHeight();

  const renderNotificationItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        className={`bg-gray-200 rounded-lg mx-4 my-2 p-4 shadow ${
          item.read ? "opacity-70" : "bg-blue-50"
        }`}
        onPress={() => openModal(item)}
      >
        <View className='flex-1'>
          <Text
            className='text-base font-semibold text-gray-800 mb-1'
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            {item.title}
          </Text>
          <Text
            className='text-sm text-gray-600 mb-2'
            numberOfLines={2}
            ellipsizeMode='tail'
          >
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
    ),
    [openModal]
  );

  const memoizedNotifications = useMemo(() => notifications, [notifications]);

  if (isLoading) {
    return (
      <View className='flex-1 justify-center items-center bg-indigo-500'>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    );
  }

  return (
    <SafeAreaView
      className='flex-1 justify-center items-center bg-primary'
      style={{ paddingTop: headerHeight }}
    >
      <FlatList
        data={memoizedNotifications}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderNotificationItem}
        ListEmptyComponent={EmptyState}
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
          <View className='bg-primary rounded-xl p-6 w-11/12 max-h-4/5'>
            <TouchableOpacity className='self-end mb-4' onPress={closeModal}>
              <Ionicons name='close' size={24} color='red' />
            </TouchableOpacity>
            {selectedNotification && (
              <>
                <Text className='text-xl font-bold text-gray-200 mb-3'>
                  {selectedNotification.title}
                </Text>
                <Text className='text-base text-gray-300 mb-4'>
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
