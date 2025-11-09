import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import View from '../default/View';
import Svg from './Svg';
import useColor from 'hooks/use-color.ts';
import { ColorProps } from '../../constants/colors';

export type IconButtonProps = {
  icon: string;
  onPress?: () => void;
  size?: number;
  color?: ColorProps | string;
  background?: ColorProps | string;
  width?: number;
  height?: number;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: TouchableOpacityProps['style'];
};

const IconBtn: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  size = 18,
  color = 'text',
  background,
  width = 32,
  height = 32,
  disabled,
  accessibilityLabel,
  style,
}) => {
  const { colors } = useColor();

  const resolvedColor = typeof color === 'string' && colors[color as ColorProps]
    ? colors[color as ColorProps]
    : color;

  const resolvedBackground = background && typeof background === 'string' && colors[background as ColorProps]
    ? colors[background as ColorProps]
    : background;

  const radius = Math.min(width, height) / 2;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={style}
    >
      <View
        fd="flex-center"
        w={width}
        h={height}
        br={radius}
        color={resolvedBackground}
        opacity={disabled ? 0.5 : 1}
      >
        <Svg icon={icon} size={size} color={resolvedColor} />
      </View>
    </TouchableOpacity>
  );
};

export default IconBtn;
