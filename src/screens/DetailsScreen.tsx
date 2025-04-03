import React, { useRef, useEffect, useState } from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  Platform,
  SafeAreaView,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import { useFont } from "../context/fontProvider"; // Import Font Context

// Types
type Size = "S" | "M" | "L" | "XXL";
type Tab = "Descriptions" | "Reviews" | "Sold";

interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
}

const { width } = Dimensions.get("window");

const DetailsScreen: React.FC = () => {
  const { fontsLoaded } = useFont();

  if (!fontsLoaded) {
    return <Text>Loading Fonts...</Text>;
  }
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  // State
  const [selectedSize, setSelectedSize] = useState<Size>("M");
  const [activeTab, setActiveTab] = useState<Tab>("Descriptions");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  // Sample reviews data
  const reviews: Review[] = [
    {
      id: "1",
      name: "Monkey D Daffa",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4.9,
      text: "A budget-friendly jacket that is great item for any formal occasion or daily wear. They are durable, comfortable and will last for a long time if properly cared for.",
    },
    {
      id: "2",
      name: "Gold D Rijal",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg",
      rating: 4.8,
      text: "Perfect quality jacket that is comfortable for daily use. I love it!",
    },
  ];

  // Run animations on component mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Toggle favorite with animation
  const toggleFavorite = () => {
    const newValue = !isFavorite;
    setIsFavorite(newValue);

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Render size option
  const renderSizeOption = (size: Size) => {
    const isSelected = selectedSize === size;

    return (
      <TouchableOpacity
        key={size}
        style={[styles.sizeOption, isSelected && styles.selectedSizeOption]}
        onPress={() => setSelectedSize(size)}
      >
        <Text style={[styles.sizeText, isSelected && styles.selectedSizeText]}>
          {size}
        </Text>
      </TouchableOpacity>
    );
  };

  // Render tab
  const renderTab = (tab: Tab, count?: number) => {
    const isActive = activeTab === tab;
    const tabText = count ? `${tab}(${count})` : tab;

    return (
      <TouchableOpacity
        style={[styles.tab, isActive && styles.activeTab]}
        onPress={() => setActiveTab(tab)}
      >
        <Text style={[styles.tabText, isActive && styles.activeTabText]}>
          {tabText}
        </Text>
      </TouchableOpacity>
    );
  };

  // Render stars for rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    return (
      <View style={styles.starsContainer}>
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return (
              <FontAwesome key={i} name="star" size={14} color="#FFD700" />
            );
          } else if (i === fullStars && hasHalfStar) {
            return (
              <FontAwesome
                key={i}
                name="star-half-o"
                size={14}
                color="#FFD700"
              />
            );
          } else {
            return (
              <FontAwesome key={i} name="star-o" size={14} color="#FFD700" />
            );
          }
        })}
        <Text style={styles.ratingText}>{rating}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        {/* <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Product Detail</Text>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View> */}

        {/* Product Image with Blur */}
        <View
          style={{
            width: "100%",
            height: 350,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFF",
            overflow: "hidden",
            borderRadius: 20,
            paddingVertical: 20,
          }}
        >
          {/* <BlurView intensity={60} style={{ ... }} tint="light" /> */}

          <Animated.Image
            // source={require("../assets/images/image-1.jpg")}
            source={{
              uri: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
            }}
            style={{
              width: "90%", // Adjust based on your design
              height: "100%", // Fill the container
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
              resizeMode: "cover",
              borderRadius: 30,
            }}
          />
        </View>

        {/* Product Info */}
        <Animated.View
          style={[
            styles.productInfo,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.titleRow}>
            <Text style={styles.productTitle}>Retirement Thug Jacket</Text>
            <TouchableOpacity onPress={toggleFavorite}>
              <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <AntDesign
                  name={isFavorite ? "heart" : "hearto"}
                  size={24}
                  color={isFavorite ? "#FF3B30" : "#000"}
                />
              </Animated.View>
            </TouchableOpacity>
          </View>

          <Text style={styles.price}>IDR 700,000</Text>

          {/* Size Selection */}
          <View style={styles.sizeContainer}>
            <Text style={styles.sizeLabel}>Size</Text>
            <View style={styles.sizeOptions}>
              {(["S", "M", "L", "XXL"] as Size[]).map(renderSizeOption)}
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            {renderTab("Descriptions")}
            {renderTab("Reviews", 300)}
            {renderTab("Sold", 900)}
          </View>

          {/* Tab Content */}
          <View style={styles.tabContent}>
            {activeTab === "Descriptions" && (
              <Text style={styles.descriptionText}>
                Premium quality jacket made with durable materials. Perfect for
                casual and formal occasions.Experience the perfect blend of
                style, comfort, and durability with our premium-quality jacket.
                Crafted from high-grade, long-lasting materials, this jacket
                offers exceptional resilience while maintaining a sleek and
                sophisticated look. Designed to complement both casual outings
                and formal events, it seamlessly enhances your wardrobe with its
                versatile appeal. Whether you're heading to a business meeting,
                a casual get-together, or a night out, this jacket ensures you
                look effortlessly stylish while staying comfortable.
              </Text>
            )}

            {activeTab === "Reviews" && (
              <View style={styles.reviewsContainer}>
                {reviews.map((review) => (
                  <View key={review.id} style={styles.reviewItem}>
                    <View style={styles.reviewHeader}>
                      <Image
                        resizeMode="cover"
                        source={{ uri: review.avatar }}
                        style={styles.reviewerAvatar}
                      />
                      <View style={styles.reviewerInfo}>
                        <Text style={styles.reviewerName}>{review.name}</Text>
                        {renderStars(review.rating)}
                      </View>
                    </View>
                    <Text style={styles.reviewText}>{review.text}</Text>
                  </View>
                ))}
              </View>
            )}

            {activeTab === "Sold" && (
              <View style={styles.soldContainer}>
                <Text style={styles.soldText}>
                  559 items sold in the last month
                </Text>
              </View>
            )}
          </View>
        </Animated.View>
      </ScrollView>

      {/* Buy Now Button */}
      <Animated.View
        style={[
          styles.buyButtonContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setIsChecked(!isChecked)}
        >
          <View style={{}}>
            <Ionicons name="cart" size={30} color="#000" />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  shareButton: {
    padding: 8,
  },
  imageContainer: {
    display: "flex",
    overflow: "hidden",
    width: "80%",
    height: 350,
    // alignContent: "center",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    flexDirection: "column",
  },
  blurBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 20,
  },
  paginationDots: {
    flexDirection: "row",
    position: "absolute",
    bottom: 16,
    alignSelf: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D8D8D8",
    marginHorizontal: 4,
  },
  activeDot: {
    width: 16,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4CD964",
    marginHorizontal: 4,
  },
  productInfo: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 100,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginBottom: 8,
  },
  productTitle: {
    fontSize: 22,
    // fontWeight: "bold",
    fontFamily: "ank",
    flex: 1,
  },
  price: {
    fontFamily: "pts",
    fontSize: 20,
    // fontWeight: "700",
    color: "#000",
    marginBottom: 16,
  },
  sizeContainer: {
    marginVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 15,
  },
  sizeLabel: {
    // paddingTop: 10,
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "ptsbold",
    // marginBottom: 12,
  },
  sizeOptions: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  sizeOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  selectedSizeOption: {
    backgroundColor: "black",
    borderColor: "black",
  },
  sizeText: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "ank",
  },
  selectedSizeText: {
    color: "#FFF",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderBottomWidth: 1,

    borderBottomColor: "#E0E0E0",
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 12,
    marginRight: 24,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  tabText: {
    fontSize: 17,
    color: "#888",
    fontFamily: "ptsbold",
  },
  activeTabText: {
    color: "#000",
    fontWeight: "600",
  },
  tabContent: {
    minHeight: 150,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: "ank",
    opacity: 0.75,
    lineHeight: 22,
    color: "#444",
  },
  reviewsContainer: {
    marginTop: 8,
  },
  reviewItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  reviewHeader: {
    flexDirection: "row",
    marginBottom: 8,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewerInfo: {
    flex: 1,
    justifyContent: "center",
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
    color: "#FFD700",
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#444",
    fontFamily: "ank",
    opacity: 0.75,
  },
  soldContainer: {
    padding: 16,
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
  },
  soldText: {
    fontSize: 14,
    color: "#444",
    fontFamily: "ank",
    opacity: 0.75,
  },
  buyButtonContainer: {
    position: "absolute",
    bottom: 0,
    columnGap: 10,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    paddingBottom: Platform.OS === "ios" ? 30 : 12,
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#4CD964",
    borderColor: "#4CD964",
  },
  buyButton: {
    flex: 1,
    backgroundColor: "#000",
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buyButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "ank",
  },
});

export default DetailsScreen;
