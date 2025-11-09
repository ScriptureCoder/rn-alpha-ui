import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Edge, SafeAreaView as NativeSafeAreaView } from 'react-native-safe-area-context';
import View, { CustomViewProps, PositionProps, SpacingProps } from '../default/View';
import useColor from 'hooks/use-color.ts';
import { ColorProps } from '../../constants/colors';

export type SafeAreaProps = Omit<CustomViewProps, 'children'> &
  SpacingProps &
  PositionProps & {
    edges?: Edge[];
    children?: React.ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
  };

const DEFAULT_EDGES: Edge[] = ['top', 'right', 'left', 'bottom'];

const SafeAreaView: React.FC<SafeAreaProps> = ({
  edges = DEFAULT_EDGES,
  children,
  containerStyle,
  color = 'background',
  flex = 1,
  style,
  ...rest
}) => {
  const { colors } = useColor();
  const resolvedBackground =
    typeof color === 'string' && colors[color as ColorProps]
      ? colors[color as ColorProps]
      : color;

  return (
    <NativeSafeAreaView
      edges={edges}
      style={[
        { flex, backgroundColor: typeof resolvedBackground === 'string' ? resolvedBackground : undefined },
        containerStyle,
      ]}
    >
      <View flex={flex} color={color} style={style} {...rest}>
        {children}
      </View>
    </NativeSafeAreaView>
  );
};

export default SafeAreaView;
