import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const TransfertLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name='Depot'
          options={{
            headerTitle: "Dépot",
            headerStyle: { backgroundColor: "#161622" },
            headerTitleStyle: { color: "#bef264" },
            headerLargeTitle: true,
            headerLargeTitleStyle: { color: "#bef264" },
            headerBackTitleStyle: { backgroundColor: "#ffffff" },
            headerLargeTitleShadowVisible: true,
            headerShadowVisible: true,
          }}
        />
        <Stack.Screen
          name='Scanner'
          options={{
            headerTitle: " Scanner",
            headerStyle: { backgroundColor: "#6b7280" },
            headerTransparent: true,
            headerLargeTitleStyle: { color: "#bef264" },
            headerLargeTitleShadowVisible: true,
            headerShadowVisible: true,
          }}
        />
        <Stack.Screen
          name='Transfer'
          options={{
            headerTitle: " Transfert",
            headerStyle: { backgroundColor: "#6b7280" },
            headerTransparent: true,
            headerLargeTitleStyle: { color: "#bef264" },
            headerLargeTitleShadowVisible: true,
            headerShadowVisible: true,
          }}
        />
        <Stack.Screen name='ServicesDépot' options={{ headerShown: false }} />
        <Stack.Screen
          name='MoMoDepot'
          options={{
            headerTitle: "Dépot MoMo",
            headerStyle: { backgroundColor: "#6b7280" },
            headerTransparent: true,
            headerLargeTitleStyle: { color: "#bef264" },
            headerLargeTitleShadowVisible: true,
            headerShadowVisible: true,
          }}
        />
        <Stack.Screen
          name='OmDepot'
          options={{
            headerTitle: "Dépot OM",
            headerStyle: { backgroundColor: "#6b7280" },
            headerTransparent: true,
            headerLargeTitleStyle: { color: "#bef264" },
            headerLargeTitleShadowVisible: true,
            headerShadowVisible: true,
          }}
        />
        <Stack.Screen
          name='VisaDepot'
          options={{
            headerTitle: "Ajouter une Carte ",
            headerTitleStyle: { color: "#bef264" },
            headerStyle: { backgroundColor: "#6b7280" },
            headerTransparent: true,
            headerLargeTitleStyle: { color: "#bef264" },
            headerLargeTitleShadowVisible: true,
            headerShadowVisible: true,
          }}
        />
        <Stack.Screen
          name='TransactionSuccess'
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='TransactionFailed'
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='RequestPage'
          options={{
            headerTitle: "Demande de paye",
            headerStyle: { backgroundColor: "#6b7280" },
            headerTransparent: true,
            headerLargeTitleStyle: { color: "#bef264" },
            headerLargeTitleShadowVisible: true,
            headerShadowVisible: true,
          }}
        />
        <Stack.Screen
          name='Depot_carte'
          options={{
            headerTitle: "Dépot avec carte bancaire",
            headerStyle: { backgroundColor: "#6b7280" },
            headerTransparent: true,
            headerLargeTitleStyle: { color: "#bef264" },
            headerLargeTitleShadowVisible: true,
            headerShadowVisible: true,
          }}
        />

        <Stack.Screen
          name='Dépot_bancair'
          options={{
            headerTitle: "Dépot avec carte bancaire",
            headerStyle: { backgroundColor: "#6b7280" },
            headerTransparent: true,
            headerLargeTitleStyle: { color: "#bef264" },
            headerLargeTitleShadowVisible: true,
            headerShadowVisible: true,
          }}
        />
      </Stack>
      <StatusBar backgroundColor='#161622' style='light' />
    </>
  );
};

export default TransfertLayout;
