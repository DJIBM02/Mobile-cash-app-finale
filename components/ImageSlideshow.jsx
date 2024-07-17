import React, { useState, useEffect, useRef } from "react";
import { View, Dimensions, Animated } from "react-native";
import Swiper from "react-native-swiper";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

const localImages = [
  require("../assets/images/thumbnail.png"),
  require("../assets/images/cards.png"),
  require("../assets/images/rotated.png"),
  require("../assets/images/rotated2.png"),
];

const { width } = Dimensions.get("window");

const ImageSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const animatedValues = useRef(
    localImages.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const animations = animatedValues.map((value, index) =>
      Animated.timing(value, {
        toValue: index === activeIndex ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      })
    );
    Animated.parallel(animations).start();
  }, [activeIndex]);

  const PaginationDot = ({ index }) => {
    const width = animatedValues[index].interpolate({
      inputRange: [0, 1],
      outputRange: [8, 24],
    });

    const opacity = animatedValues[index].interpolate({
      inputRange: [0, 1],
      outputRange: [0.4, 1],
    });

    return (
      <Animated.View
        className='h-2 rounded-full mr-2'
        style={{
          width,
          opacity,
          backgroundColor: "#FFFFFF",
        }}
      />
    );
  };

  return (
    <View className='w-full h-[235px] overflow-hidden relative rounded-3xl'>
      <Swiper
        autoplay
        autoplayTimeout={5}
        loop
        onIndexChanged={setActiveIndex}
        showsPagination={false}
        scrollEnabled={true}
        horizontal={true}
        removeClippedSubviews={false}
        bounces={true}
      >
        {localImages.map((image, index) => (
          <View key={index} className='w-full h-full'>
            <Image
              source={image}
              className='w-full h-full'
              contentFit='cover'
            />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.7)"]}
              className='absolute left-0 right-0 bottom-0 h-[100px]'
            />
          </View>
        ))}
      </Swiper>
      <View className='absolute bottom-5 left-5 flex-row items-center'>
        {localImages.map((_, index) => (
          <PaginationDot key={index} index={index} />
        ))}
      </View>
    </View>
  );
};

export default ImageSlider;
