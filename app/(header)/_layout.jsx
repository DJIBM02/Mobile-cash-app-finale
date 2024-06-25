import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const TransfertLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name='profile'
          options={{
            headerTitle: "Profile",
            headerStyle: { backgroundColor: "#6b7280" },
            headerLargeTitle: true,
            headerLargeTitleStyle: { color: "#bef264" },
            headerBackTitleStyle: { backgroundColor: "#ffffff" },
            headerLargeTitleShadowVisible: false,
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name='charte'
          options={{
            headerTitle: " Charte",
            headerStyle: { backgroundColor: "#6b7280" },
            headerTransparent: true,
            headerLargeTitleStyle: { color: "#bef264" },
            headerLargeTitleShadowVisible: false,
            headerShadowVisible: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='notifications'
          options={{
            headerTitle: "Notifications",
            headerStyle: { backgroundColor: "#6b7280" },
            headerTransparent: true,
            headerLargeTitleStyle: { color: "#bef264" },
            headerLargeTitleShadowVisible: false,
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name='paramétre'
          options={{
            headerTitle: "Paramétre",
            headerStyle: { backgroundColor: "#6b7280" },
            headerTransparent: true,
            headerLargeTitleStyle: { color: "#bef264" },
            headerLargeTitleShadowVisible: false,
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name='litige'
          options={{
            headerTitle: "Litige",
            headerStyle: { backgroundColor: "#6b7280" },
            headerTransparent: true,
            headerLargeTitleStyle: { color: "#bef264" },
            headerLargeTitleShadowVisible: false,
            headerShadowVisible: false,
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar backgroundColor='#161622' style='light' />
    </>
  );
};

export default TransfertLayout;
