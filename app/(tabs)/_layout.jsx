// @ts-nocheck
import React, { useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { Image } from "expo-image";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { icons } from "../../constants";

const initialLayout = { width: Dimensions.get("window").width };

const HomeScreen = () => (
  <View>
    <Text>Home Screen</Text>
  </View>
);
const CreateScreen = () => (
  <View>
    <Text>Create Screen</Text>
  </View>
);
const BookmarkScreen = () => (
  <View>
    <Text>Bookmark Screen</Text>
  </View>
);
const LitScreen = () => (
  <View>
    <Text>Lit Screen</Text>
  </View>
);

const renderScene = SceneMap({
  home: HomeScreen,
  create: CreateScreen,
  bookmark: BookmarkScreen,
  lit: LitScreen,
});

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className='flex items-center justify-center gap-2 min-h-[45px] min-w-full'>
      <Image
        source={icon}
        contentFit='cover'
        tintColor={color}
        className='w-6 h-6'
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
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "home", title: "Accueil", icon: icons.home },
    { key: "create", title: "Contact", icon: icons.profile },
    { key: "bookmark", title: "Historique", icon: icons.bookmark },
    { key: "lit", title: "Litige", icon: icons.plus },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      renderIcon={({ route, focused, color }) => (
        <TabIcon
          icon={route.icon}
          color={color}
          name={route.title}
          focused={focused}
        />
      )}
      indicatorStyle={{ backgroundColor: "#bef264" }}
      style={{ backgroundColor: "#161622" }}
      activeColor='#bef264'
      inactiveColor='#CDCDE0'
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
      swipeEnabled={true}
    />
  );
};

export default TabsLayout;
