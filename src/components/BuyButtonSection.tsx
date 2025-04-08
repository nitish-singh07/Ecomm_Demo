import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Using Expo Icons, install via `npm install @expo/vector-icons`

const BuyNowSection: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Buy Now Button */}
      <TouchableOpacity style={styles.buyNowButton}>
        <Text style={styles.buyNowText}>Buy Now</Text>
      </TouchableOpacity>

      {/* Overlayed Icon */}
      <TouchableOpacity style={styles.iconContainer}>
        <Ionicons name="bag-outline" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.floatingBuyNowContainer}>
        <TouchableOpacity
          style={styles.floatingBuyNowButton}
          onPress={() => console.log("Buy Now pressed!")}
        >
          <Ionicons
            name="ios-bag-handle-outline"
            size={20}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.floatingBuyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  // buyNowButton: {
  //   flex: 1,
  //   backgroundColor: "#28a745",
  //   paddingVertical: 12,
  //   borderRadius: 30,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // buyNowText: {
  //   color: "white",
  //   fontSize: 16,
  //   fontWeight: "bold",
  // },
  iconContainer: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    borderRadius: 20,
  },
  buyNowContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },

  buyNowButton: {
    flexDirection: "row",
    backgroundColor: "#00C97E",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  buyNowText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "ptsbold",
  },
  floatingBuyNowContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999, // makes sure it's on top
  },

  floatingBuyNowButton: {
    flexDirection: "row",
    backgroundColor: "#00C97E",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  floatingBuyNowText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "ptsbold",
  },
});

export default BuyNowSection;
