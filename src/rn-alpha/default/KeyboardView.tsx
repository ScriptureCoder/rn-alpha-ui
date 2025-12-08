import React from 'react';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import {useKeyboardHandler} from "react-native-keyboard-controller";
import { Animated } from "react-native";

type KeyboardViewProps = {
  children?: React.ReactNode;
}

const KeyboardView: React.FC<KeyboardViewProps> = (props) => {
  const {children} = props;

  const bottom = useSharedValue(0);

  useKeyboardHandler({
    onStart: (e) => {
      'worklet'; // <--- REQUIRED
      bottom.value = withTiming(e.height);
    },
    /*onEnd: () => {
        'worklet'; // <--- REQUIRED
        bottom.value = withTiming(0);
    }*/
  });

  const footerStyle = useAnimatedStyle(() => ({
    paddingBottom: bottom.value,
  }));

  return (
      <>
        <Animated.View style={[{ flex: 1 }, footerStyle]}>
          { children }
        </Animated.View>
      </>
  );
};

export default KeyboardView;
