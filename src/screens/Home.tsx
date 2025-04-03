import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  // SafeAreaView,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";

import { Search, Bell, Heart } from "react-native-feather";
import { NavigationProp } from "@react-navigation/native";
import Carousel from "../components/Carousel";
const SCREEN_WIDTH = Dimensions.get("window").width;
import Icons from "@expo/vector-icons/MaterialIcons";
import { useFont } from "../context/fontProvider";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const AVATAR_URL =
  "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";

const image1 = require("../assets/images/image-1.jpg");
const image2 = require("../assets/images/image-2.jpg");
const image3 = require("../assets/images/image-3.jpg");
const image4 = require("../assets/images/image-4.jpg");
const image5 = require("../assets/images/image-5.jpg");
const image6 = require("../assets/images/image-6.jpg");

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  isFavorite: boolean;
}

interface HomeScreenProps {
  navigation: NavigationProp<any>;
}

const CATEGORIES: string[] = ["Popular", "Jacket", "Shoes", "Pants"];

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Wake - Hoodie",
    price: 129,
    image: image1,
    brand: "Wake Officials",
    isFavorite: false,
  },
  {
    id: "2",
    name: "Wake - Hoodie",
    price: 129,
    image: image2,
    brand: "Wake Officials",
    isFavorite: false,
  },
  {
    id: "3",
    name: "Wake - Hoodie",
    price: 129,
    image: image3,
    brand: "Wake Officials",
    isFavorite: false,
  },
  {
    id: "4",
    name: "Wake - Hoodie",
    price: 129,
    image: image4,
    brand: "Wake Officials",
    isFavorite: false,
  },
  {
    id: "5",
    name: "Wake - Hoodie",
    price: 129,
    image: image5,
    brand: "Wake Officials",
    isFavorite: false,
  },
  {
    id: "6",
    name: "Wake - Hoodie",
    price: 129,
    image: image5,
    brand: "Wake Officials",
    isFavorite: false,
  },
];

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Popular");
  const { fontsLoaded } = useFont();

  if (!fontsLoaded) {
    return <Text>Loading Fonts...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <StatusBar backgroundColor="#161616" barStyle="light-content" />

      <View
        style={{
          top: 0,
          left: 0,
          backgroundColor: "#161616",
          paddingTop: 15,
          paddingBottom: 15,
          position: "relative",
          width: "100%",
          elevation: 4,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          zIndex: 1,
        }}
      >
        <View
          style={{
            paddingHorizontal: 24,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            paddingBottom: 20,
            backgroundColor: "#161616",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <Image
            source={{
              uri: AVATAR_URL,
            }}
            style={{ width: 52, aspectRatio: 1, borderRadius: 52 }}
            resizeMode="cover"
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 18,
                color: "white",
                fontFamily: "ank",
                marginBottom: 3,
              }}
              numberOfLines={1}
            >
              Hi, James 👋
            </Text>
            <Text
              style={{
                color: "white",

                // color: colors.text,
                opacity: 0.75,
                fontFamily: "ptr",
              }}
              numberOfLines={1}
            >
              Discover fashion that suit your style
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: 52,
              aspectRatio: 1,
              backgroundColor: "#242424",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 52,
              borderWidth: 1,
              borderColor: "#fff",
            }}
          >
            <Icons name="notifications" size={24} color={"#fff"} />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", gap: 12, paddingHorizontal: 20 }}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              flex: 1,
              height: 50,
              borderRadius: 52,
              borderWidth: 1,
              backgroundColor: "#242424",
              borderColor: "white",
              flexDirection: "row",

              alignItems: "center",
              paddingHorizontal: 16,
            }}
          >
            <Icons
              name="search"
              size={20}
              color="white"
              style={{ opacity: 0.5 }}
            />
            <TextInput
              style={{
                flex: 1,
                fontSize: 16,

                color: "white",
                fontFamily: "ank",
                paddingVertical: 0,

                includeFontPadding: false,
                textAlignVertical: "center",
              }}
              placeholder="Search"
              placeholderTextColor="rgba(255,255,255,0.5)"
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{
          top: 0,
          left: 0,
          position: "relative",
          zIndex: 2,

          paddingVertical: 23,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Carousel />
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Popular Products */}
        <View style={styles.productsHeader}>
          <Text style={styles.productsTitle}>Popular Product</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Popular Products  images girds*/}
        <View style={styles.productsGrid}>
          {PRODUCTS.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() => navigation.navigate("ProductDetail", { product })}
            >
              <View style={styles.productImageContainer}>
                <Image
                  source={
                    typeof product.image === "string"
                      ? { uri: product.image }
                      : product.image
                  }
                  style={styles.productImage}
                />
                <TouchableOpacity style={styles.favoriteButton}>
                  <Heart
                    stroke="#000"
                    fill={product.isFavorite ? "#000" : "none"}
                    width={20}
                    height={20}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.priceText}>${product.price}</Text>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.brandText}>{product.brand}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userInfo: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  welcomeText: { fontSize: 12, color: "#8E8E93" },
  appName: { fontSize: 18, fontWeight: "bold" },
  headerIcons: { flexDirection: "row" },
  iconButton: { marginLeft: 16 },
  categoriesContainer: { marginTop: 16 },
  categoriesContent: { paddingHorizontal: 12 },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: "#F2F2F7",
  },
  selectedCategory: { backgroundColor: "#000" },
  categoryText: { color: "#8E8E93", fontWeight: "500" },
  selectedCategoryText: { color: "white" },
  productsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 16,
  },
  productsTitle: { fontSize: 18, fontWeight: "bold" },
  seeAllText: { color: "#007AFF", fontWeight: "500" },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
  },
  productCard: { width: "50%", paddingHorizontal: 4, marginBottom: 16 },
  productImageContainer: {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
  },
  productImage: { width: "100%", height: 180, resizeMode: "cover" },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 6,
  },
  productInfo: { marginTop: 8 },
  priceText: { fontWeight: "bold", fontSize: 14 },
  productName: { fontSize: 14, fontWeight: "600", marginBottom: 4 },
  brandText: { fontSize: 12, color: "#8E8E93" },
});
