import {
  FlatList,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";
import React from "react";
import Animated, {
  AnimatedRef,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { OnboardingData } from "@/assets/data/data";

const CustomButton = ({
  dataLength,
  flatlistIndex,
  flatlistRef,
  x,
}: {
  dataLength: number;
  flatlistIndex: SharedValue<number>;
  flatlistRef: AnimatedRef<FlatList<OnboardingData>>;
  x: SharedValue<number>;
}) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      ["#005b4f", "#1e2169", "#F15937"]
    );

    return {
      backgroundColor: backgroundColor,
    };
  });

  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      width:
        flatlistIndex.value === dataLength - 1
          ? withSpring(140)
          : withSpring(60),
      height: 60,
    };
  });

  const arrowAnimationStyle = useAnimatedStyle(() => {
    return {
      width: 30,
      height: 30,
      opacity:
        flatlistIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
      transform: [
        {
          translateX:
            flatlistIndex.value === dataLength - 1
              ? withTiming(100)
              : withTiming(0),
        },
      ],
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        flatlistIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            flatlistIndex.value === dataLength - 1
              ? withTiming(0)
              : withTiming(-100),
        },
      ],
    };
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (flatlistIndex.value < dataLength - 1) {
          flatlistRef.current?.scrollToIndex({
            index: flatlistIndex.value + 1,
          });
        } else {
          console.log("Navigate to next screen");
        }
      }}
    >
      <Animated.View
        style={[animatedColor, buttonAnimationStyle]}
        className=" p-4 rounded-full justify-center items-center overflow-hidden"
      >
        <Animated.Text
          style={textAnimationStyle}
          className="text-md font-semibold text-[#f9f6ef]"
        >
          Get Started
        </Animated.Text>
        <Animated.Image
          style={arrowAnimationStyle}
          source={require("../assets/images/ArrowIcon.png")}
          className="w-8 h-8 absolute"
          resizeMode="contain"
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default CustomButton;
