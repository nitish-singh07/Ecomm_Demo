import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { RootStackScreenProps } from "../navigators/RootNavigator";
import { BlurView } from "expo-blur";

const { width, height } = Dimensions.get("window");

const image1 = require("../assets/images/image-1.jpg");
const image2 = require("../assets/images/image-2.jpg");
const image3 = require("../assets/images/image-3.jpg");
const image4 = require("../assets/images/image-4.jpg");
const image5 = require("../assets/images/image-5.jpg");
const image6 = require("../assets/images/image-6.jpg");
const image7 = require("../assets/images/image-7.jpg");

const onboardingData = [
  {
    id: "1",
    title: "MAKE IT\nFASHIONABLE",
    subtitle: "With new fashion style",
    image: image6,
  },
  {
    id: "2",
    title: "SHOP THE MODERN\nESSENTIALS",
    subtitle: "With most modern fashion style",
    image: image2,
  },
  {
    id: "3",
    title: "NEW CLOTHS\nNEW PASSION",
    subtitle: "With new fashion style",
    image: image7,
  },
];

type Props = RootStackScreenProps<"OnboardingScreen">;

export default function OnboardingScreen({ navigation }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (currentIndex === onboardingData.length - 1) {
      const timer = setTimeout(() => {
        navigation.replace("TabsStack");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.slide}>
      <View style={styles.rightImageContainer}>
        <Image source={item.image} style={styles.image} />
      </View>

      <View style={styles.leftImageContainer}>
        <Image source={item.image} style={styles.image} />
        <BlurView intensity={50} tint="dark" style={StyleSheet.absoluteFill} />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.logo}>AVAKEEN</Text>
          <TouchableOpacity onPress={() => navigation.replace("TabsStack")}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>

        <View style={styles.paginationContainer}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentIndex ? styles.paginationDotActive : null,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  slide: {
    width,
    height,
    position: "relative",
  },
  leftImageContainer: {
    position: "absolute",
    left: 0,
    width: width / 2,
    height,
    overflow: "hidden",
  },
  rightImageContainer: {
    position: "absolute",
    right: 0,
    width: width / 2,
    height,
    overflow: "hidden",
  },
  image: {
    width,
    height,
    position: "absolute",
    resizeMode: "cover",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },
  logo: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  skipText: {
    color: "#fff",
    fontSize: 16,
  },
  textContainer: {
    marginBottom: 80,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    letterSpacing: 1,
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 16,
  },
  paginationContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    left: 0,
    right: 0,
    justifyContent: "center",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#fff",
    width: 24,
  },
});
