import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Swiper from "react-native-swiper";

const ImageSlider = () => {
  const [images, setImages] = useState([
    {
      source: "https://via.placeholder.com/800x400.png?text=First+Image",
      url: "https://images.app.goo.gl/zXi9xbYGCZHaJnXv6",
    }, // Sending money
    {
      source: "https://via.placeholder.com/800x400.png?text=Second+Image",
      url: "https://example.com/second-image",
    }, // Bill payment
    {
      source: "https://via.placeholder.com/800x400.png?text=Third+Image",
      url: "https://example.com/Third-image",
    }, // Bill payment
    {
      source: "https://via.placeholder.com/800x400.png?text=Fourth+Image",
      url: "https://example.com/Fourth-image",
    }, // Bill payment
  ]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [images]);

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: 200, // Adjust height as needed
      overflow: "hidden",
    },
    sliderImage: {
      width: Dimensions.get("window").width,
      height: "100%",
      resizeMode: "cover",
    },
    paginationContainer: {
      position: "absolute",
      bottom: 10,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 4,
      backgroundColor: "gray",
    },
    paginationDotActive: {
      backgroundColor: "#bef264",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "black",
      opacity: 0.5,
    },
  });

  return (
    <View style={styles.container}>
      <Swiper autoplay loop onIndexChange={(index) => setActiveIndex(index)}>
        {images.map((image) => (
          <View key={image.source}>
            <Image source={{ uri: image.source }} style={styles.sliderImage} />
            <TouchableOpacity onPress={() => window.open(image.url)}>
              <View style={styles.overlay} />
            </TouchableOpacity>
          </View>
        ))}
      </Swiper>
      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageSlider;
