import { AnimationObject } from "lottie-react-native";

export interface OnboardingData {
  id: number;
  animation: AnimationObject;
  text: string;
  textColor: string;
  backgroundColor: string;
}

const data: OnboardingData[] = [
  {
    id: 1,
    animation: require("../animations/Lottie1.json"),
    text: "The future of app development",
    textColor: "#005b4f",
    backgroundColor: "#ffa3ce",
  },
  {
    id: 2,
    animation: require("../animations/Lottie2.json"),
    text: "Transitions when moving around",
    textColor: "#1e2169",
    backgroundColor: "#bae4fd",
  },
  {
    id: 3,
    animation: require("../animations/Lottie3.json"),
    text: "Dare to dream",
    textColor: "#F15937",
    backgroundColor: "#faeb8a",
  },
];

export default data;
