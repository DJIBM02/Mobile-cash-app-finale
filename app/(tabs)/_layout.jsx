import { View, Text } from "react-native";
import { Tabs } from "expo-router";
import { Image } from "expo-image";
import { icons } from "../../constants";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className='flex items-center justify-center gap-2 min-h-[45px] min-w-full'>
      <Image
        source={icon}
        contentFit='cover'
        tintColor={color}
        className='min-h-[22px] min-w-[22px]'
        transition={1000}
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }} className='bg-primary h-full'>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#bef264",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1 / 2,
            borderTopColor: "#4b5563",
            height: 64,
          },
        }}
      >
        <Tabs.Screen
          name='home'
          options={{
            title: "home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name='Accueil'
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name='create'
          options={{
            title: "create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name='contact'
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name='bookmark'
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name='Historique'
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
};

export default TabsLayout;
