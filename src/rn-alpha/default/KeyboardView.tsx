import React from 'react';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {useKeyboardHandler} from "react-native-keyboard-controller";
import {useDimensions} from "../index.ts";

type KeyboardViewProps = {
  children?: React.ReactNode;
}

const KeyboardView: React.FC<KeyboardViewProps> = (props) => {
  const {children} = props;

  const bottom = useSharedValue(0);
  const dim = useDimensions()


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
    paddingBottom: bottom.value - dim.bottom,
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
