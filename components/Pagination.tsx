import { View } from "react-native";
import React from "react";
import { OnboardingData } from "@/assets/data/data";
import { SharedValue } from "react-native-reanimated";
import Dot from "./Dot";

const Pagination = ({
  data,
  x,
}: {
  data: OnboardingData[];
  x: SharedValue<number>;
}) => {
  return (
    <View className="flex-row items-center justify-center h-10 ">
      {data.map((_, index) => {
        return <Dot key={index} index={index} x={x} />;
      })}
    </View>
  );
};

export default Pagination;
