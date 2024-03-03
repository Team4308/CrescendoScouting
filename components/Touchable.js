import * as React from "react";
import * as Haptics from "expo-haptics";
import { View, Pressable } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function Touchable({ children, onPress, ...props }) {
  const scaleDownAnimation = useSharedValue(1);
  const scaleHandler = Gesture.Tap()
    .onBegin(() => {
      "worklet";
      scaleDownAnimation.value = withSpring(0.95);
    })
    .onFinalize(() => {
      "worklet";
      scaleDownAnimation.value = withSpring(1);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleDownAnimation.value }],
  }));

  return (
      <Animated.View style={animatedStyle}>
        <GestureDetector gesture={scaleHandler}>
          <Pressable
            {...props}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              onPress && onPress();
            }}
          >
            {children}
          </Pressable>
        </GestureDetector>
      </Animated.View>
  );
}
