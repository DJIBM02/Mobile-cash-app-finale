import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Animated,
  Easing,
} from "react-native";
import React, { useState, useRef } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";

const MenuPopUp = () => {
  const [visible, setVisible] = useState(false);
  const scale = useRef(new Animated.Value(0)).current;
  const options = [
    { title: "Profile", icon: "user", action: () => router.push("/profile") },
    { title: "Litige", icon: "flag", action: () => router.push("/litige") },
    {
      title: "Charte",
      icon: "linechart",
      action: () => router.push("/charte"),
    },
    {
      title: "Paramétre",
      icon: "setting",
      action: () => router.push("/paramétre"),
    },
  ];

  function resizeBox(to) {
    to === 1 && setVisible(true);
    Animated.timing(scale, {
      toValue: to,
      useNativeDriver: true,
      duration: 150,
      easing: Easing.linear,
    }).start(() => to === 0 && setVisible(false));
  }

  return (
    <>
      <TouchableOpacity onPress={() => resizeBox(1)}>
        <Entypo name='list' size={26} color={"#ffffff"} />
      </TouchableOpacity>
      <Modal transparent visible={visible} animationType='fade'>
        <SafeAreaView
          style={{
            flex: 1,
            position: "absolute",
            bottom: 25,
            top: 15,
            right: 9,
            left: 100,
            backgroundColor: "rgba(0,0,0,0)",
          }}
          onTouchStart={() => resizeBox(0)}
        >
          <Animated.View
            style={[
              {
                opacity: scale.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
                transform: [{ scale }],
              },
              {
                width: 250,
                backgroundColor: "#161622", // Updated color
                borderRadius: 10,
                padding: 10,
              },
            ]}
          >
            {options.map((op, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  resizeBox(0);
                  op.action();
                }}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottomWidth: i === options.length - 1 ? 0 : 1,
                  borderBottomColor: "#444",
                  paddingVertical: 15,
                }}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>{op.title}</Text>
                <AntDesign name={op.icon} size={20} color={"#ffffff"} />
              </TouchableOpacity>
            ))}
          </Animated.View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default MenuPopUp;
