import React from "react";
import { View, Image, Dimensions, FlatList, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

const SRC_WIDTH = Dimensions.get("window").width;
const CARD_LENGTH = SRC_WIDTH * 0.9; // Increased to 0.9
const SPACING = SRC_WIDTH * 0.02;
const SIDECARD_LENGTH = (SRC_WIDTH - CARD_LENGTH) / 2; // Adjusted for perfect centering

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const IMAGES = [
  require("../assets/images/image-1.jpg"),
  require("../assets/images/image-2.jpg"),
  require("../assets/images/image-3.jpg"),
  require("../assets/images/image-4.jpg"),
];

interface ItemProps {
  index: number;
  scrollX: Animated.SharedValue<number>;
  image: any;
}

const Item: React.FC<ItemProps> = ({ index, scrollX, image }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      [
        (index - 1) * CARD_LENGTH,
        index * CARD_LENGTH,
        (index + 1) * CARD_LENGTH,
      ],
      [0.8, 1, 0.8],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      scrollX.value,
      [
        (index - 1) * CARD_LENGTH,
        index * CARD_LENGTH,
        (index + 1) * CARD_LENGTH,
      ],
      [0.5, 1, 0.5],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        styles.card,
        animatedStyle,
        {
          marginLeft: index === 0 ? SIDECARD_LENGTH : SPACING,
          marginRight: index === IMAGES.length - 1 ? SIDECARD_LENGTH : SPACING,
        },
      ]}
    >
      <Image source={image} style={styles.image} />
    </Animated.View>
  );
};

export default function Carousel() {
  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        data={IMAGES}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_LENGTH + SPACING * 1.5}
        snapToAlignment="center"
        scrollEventThrottle={16}
        decelerationRate="fast"
        onScroll={onScroll}
        renderItem={({ item, index }) => (
          <Item index={index} scrollX={scrollX} image={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: CARD_LENGTH,
    height: 150,
    borderRadius: 15,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
