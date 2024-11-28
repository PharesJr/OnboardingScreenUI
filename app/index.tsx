import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import RenderItem from "@/components/RenderItem";
import data, { OnboardingData } from "@/assets/data/data";
import { StatusBar } from "expo-status-bar";
import { FlatList, Text, View, ViewToken } from "react-native";
import Pagination from "@/components/Pagination";
import CustomButton from "@/components/CustomButton";

// Intro: The Main Code:
// Imagine you have a magical picture book (called FlatList)
// that you can swipe left or right to see different pages.
// Each page has a unique picture, background color, and some text.
//  We want to make this magical book even cooler by adding animations when you swipe!

const index = () => {
  const flatListRef = useAnimatedRef<FlatList<OnboardingData>>();

  // 2. Tracking the Swipe (useSharedValue & useAnimatedScrollHandler):

  // Imagine a little fairy (called x) who always knows how far you’ve swiped.
  // The fairy updates its notes whenever you scroll,
  // saying, "You’re now this far on page 1!" or "You’ve moved to page 2!"

  const x = useSharedValue(0);
  const flatlistIndex = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems[0].index !== null) {
      flatlistIndex.value = viewableItems[0].index;
    }
  };

  return (
    <SafeAreaView className="flex-1">
      {/* 1. THE BOOK (FlatList) */}
      {/* This is the main thing holding all the pages (called
      data). We use a list called Animated.FlatList to create our magical
      picture book. You can swipe through the pages, and each page is made with
      a special tool called RenderItem. As you swipe, the book listens to your
      scroll movements using something called onScroll. It tracks how far you’ve
      scrolled and saves this information in a variable (x). */}
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        renderItem={({ item, index }) => (
          <RenderItem item={item} index={index} x={x} />
        )}
        onScroll={onScroll}
        keyExtractor={(item) => item.id.toString()}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />

      <View className="absolute bottom-16 left-0 right-0 px-4 py-2 flex-row items-center justify-between">
        <Pagination data={data} x={x} />
        <CustomButton
          flatlistRef={flatListRef}
          flatlistIndex={flatlistIndex}
          dataLength={data.length}
          x={x}
        />
      </View>

      {/* 3. The Background: */}

      {/* There’s a StatusBar at the top, and we make it see-through (transparent) 
      so the colors on each page show through beautifully. */}
      <StatusBar backgroundColor="transparent" translucent style="dark" />
    </SafeAreaView>
  );
};

export default index;
