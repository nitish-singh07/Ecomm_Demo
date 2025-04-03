import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Search, Bell, Heart } from "react-native-feather";
import { NavigationProp } from "@react-navigation/native";

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
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250330-WA0003.jpg-jTdmKoLYuHq00IZNq1dXuR3j2Ig2rP.jpeg",
    brand: "Wake Officials",
    isFavorite: false,
  },
  {
    id: "2",
    name: "Wake - Hoodie",
    price: 129,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250330-WA0003.jpg-jTdmKoLYuHq00IZNq1dXuR3j2Ig2rP.jpeg",
    brand: "Wake Officials",
    isFavorite: false,
  },
];

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Popular");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image
              source={{
                uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250330-WA0003.jpg-jTdmKoLYuHq00IZNq1dXuR3j2Ig2rP.jpeg",
              }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.welcomeText}>Welcome Back</Text>
              <Text style={styles.appName}>Jobby</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Search stroke="#000" width={24} height={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Bell stroke="#000" width={24} height={24} />
            </TouchableOpacity>
          </View>
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

        <View style={styles.productsGrid}>
          {PRODUCTS.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() => navigation.navigate("ProductDetail", { product })}
            >
              <View style={styles.productImageContainer}>
                <Image
                  source={{ uri: product.image }}
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
