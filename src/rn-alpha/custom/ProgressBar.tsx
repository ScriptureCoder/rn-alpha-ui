import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import View, { SpacingProps } from '../default/View';
import useColor from 'hooks/use-color.ts';
import { ColorProps } from '../../constants/colors';

export type ProgressBarProps = SpacingProps & {
  progress?: number;
  color?: ColorProps | string;
  background?: ColorProps | string;
  height?: number;
  radius?: number;
  style?: StyleProp<ViewStyle>;
};

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress = 0,
  color = 'primary',
  background = 'shade',
  height = 6,
  radius,
  style,
  ...spacing
}) => {
  const { colors } = useColor();
  const resolvedProgress = clamp(progress);
  const barRadius = radius ?? height / 2;

  const resolvedBackground =
    typeof background === 'string' && colors[background as ColorProps]
      ? colors[background as ColorProps]
      : background;

  const resolvedColor =
    typeof color === 'string' && colors[color as ColorProps]
      ? colors[color as ColorProps]
      : color;

  return (
    <View
      color={resolvedBackground}
      h={height}
      br={barRadius}
      style={style}
      {...spacing}
    >
      <View
        color={resolvedColor}
        h={height}
        br={barRadius}
        style={{ width: `${resolvedProgress * 100}%` }}
      />
    </View>
  );
};

export default ProgressBar;
