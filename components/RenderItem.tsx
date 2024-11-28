import { View, Text, useWindowDimensions, StyleSheet } from "react-native";
import React from "react";
import { OnboardingData } from "@/assets/data/data";
import LottieView from "lottie-react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

// Intro: The Page Code:
// Each page of our magical book is brought to life with the help of the RenderItem.
//  It has three main parts: a circle, an animation, and text.

const RenderItem = ({
  item,
  index,
  x,
}: {
  item: OnboardingData;
  index: number;
  x: SharedValue<number>;
}) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  //   2. The Animation:

  // There’s also a fun animation (like a moving cartoon) on every page.
  // As you swipe, the animation wiggles or moves up and down a little bit, making it look alive.
  // This is also controlled using interpolate, but instead of size, it adjusts the position (up or down).

  const lottieAnimationStyle = useAnimatedStyle(() => {
    const translateYAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [200, 0, -200]
    );

    return {
      transform: [{ translateY: translateYAnimation }],
    };
  });

  // 1. The Circle:

  // Every page has a colorful circle in the background.
  // This circle isn’t just static; it grows bigger or smaller depending on how far you’ve swiped.
  // The circle's size changes using something called interpolate,
  // which basically asks, "Where are we right now?" and adjusts the size accordingly.

  const circleAnimation = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [1, 4, 4],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale: scale }],
    };
  });

  return (
    <View style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
      <View style={styles.circleContainer}>
        <Animated.View
          style={[
            {
              width: SCREEN_WIDTH,
              height: SCREEN_WIDTH,
              backgroundColor: item.backgroundColor,
              borderRadius: SCREEN_WIDTH / 2,
            },
            circleAnimation,
          ]}
        />
      </View>

      <Animated.View style={lottieAnimationStyle}>
        <LottieView
          source={item.animation}
          style={{
            width: SCREEN_WIDTH * 0.9,
            height: SCREEN_WIDTH * 0.9,
          }}
          autoPlay={true}
          loop={true}
        />
      </Animated.View>

      {/* 3. The Text: */}

      {/* At the bottom of each page, there’s a big piece of text that tells you something fun about that page.
 Its color matches the theme of the page. */}
      <Text style={[styles.itemText, { color: item.textColor }]}>
        {item.text}
      </Text>
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 120,
  },
  itemText: {
    textAlign: "center",
    fontSize: 38,
    fontWeight: "bold",
    marginBottom: 10,
    marginHorizontal: 20,
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
