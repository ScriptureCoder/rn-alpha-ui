import React, { useRef, useEffect } from 'react';
import { StyleProp, ViewStyle, Animated, Easing } from 'react-native';
import View, { SpacingProps } from '../default/View';
import useColor from 'hooks/use-color.ts';
import { ColorProps } from 'constants/colors.ts';

export type ProgressBarProps = SpacingProps & {
  progress?: number;
  color?: ColorProps | string;
  background?: ColorProps | string;
  height?: number;
  radius?: number;
  duration?: number;
  style?: StyleProp<ViewStyle>;
};

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress = 0,
  color = 'primary',
  background = 'shade',
  height = 6,
  radius,
  duration = 300,
  style,
  ...spacing
}) => {
  const { colors } = useColor();
  const resolvedProgress = clamp(progress);
  const barRadius = radius ?? height / 2;
  const animatedProgress = useRef(new Animated.Value(resolvedProgress)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    animationRef.current?.stop();

    animationRef.current = Animated.timing(animatedProgress, {
      toValue: resolvedProgress,
      duration,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    });

    animationRef.current.start();

    return () => {
      animationRef.current?.stop();
      animationRef.current = null;
    };
  }, [resolvedProgress, duration, animatedProgress]);

  const resolvedBackground =
    typeof background === 'string' && colors[background as ColorProps]
      ? colors[background as ColorProps]
      : background;

  const resolvedColor =
    typeof color === 'string' && colors[color as ColorProps]
      ? colors[color as ColorProps]
      : color;

  const animatedWidth = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View
      color={resolvedBackground}
      h={height}
      br={barRadius}
      style={style}
      {...spacing}
    >
      <Animated.View
        style={{
          backgroundColor: resolvedColor,
          height,
          borderRadius: barRadius,
          width: animatedWidth,
        }}
      />
    </View>
  );
};

export default ProgressBar;
