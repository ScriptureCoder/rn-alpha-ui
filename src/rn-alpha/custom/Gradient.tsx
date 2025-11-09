import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { ViewStyle, DimensionValue } from 'react-native';
import { useUIContext } from '../../theme/alpha-ui-context';
import { ColorProps } from '../../constants/colors';

export type GradientDirection = 
  | 'to-right'
  | 'to-left' 
  | 'to-top'
  | 'to-bottom'
  | 'to-top-right'
  | 'to-top-left'
  | 'to-bottom-right'
  | 'to-bottom-left'
  | 'diagonal-up'
  | 'diagonal-down';

export type GradientProps = {
  style?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
  colors?: (ColorProps | string)[];
  direction?: GradientDirection;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  locations?: number[];
  radius?: boolean;
  borderRadius?: number;
  opacity?: number;
  // Common layout props
  width?: DimensionValue;
  height?: DimensionValue;
  w?: DimensionValue;
  h?: DimensionValue;
  size?: DimensionValue;
  flex?: number;
  padding?: number;
  margin?: number;
  p?: number;
  m?: number;
  pv?: number;
  ph?: number;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
  mv?: number;
  mh?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
};

const getDirectionPoints = (direction: GradientDirection) => {
  const directions = {
    'to-right': { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } },
    'to-left': { start: { x: 1, y: 0 }, end: { x: 0, y: 0 } },
    'to-top': { start: { x: 0, y: 1 }, end: { x: 0, y: 0 } },
    'to-bottom': { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } },
    'to-top-right': { start: { x: 0, y: 1 }, end: { x: 1, y: 0 } },
    'to-top-left': { start: { x: 1, y: 1 }, end: { x: 0, y: 0 } },
    'to-bottom-right': { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
    'to-bottom-left': { start: { x: 1, y: 0 }, end: { x: 0, y: 1 } },
    'diagonal-up': { start: { x: 0, y: 1 }, end: { x: 1, y: 0 } },
    'diagonal-down': { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  };
  return directions[direction];
};

const LinearGradientComponent: React.FC<GradientProps> = ({
  children,
  style,
  colors = ['primary', 'primaryDark'],
  direction = 'to-right',
  start,
  end,
  locations,
  radius,
  borderRadius,
  opacity,
  width, w,
  height, h,
  size,
  flex,
  padding, p,
  margin, m,
  pv,
  ph,
  pt,
  pb,
  pl,
  pr,
  mv,
  mh,
  mt,
  mb,
  ml,
  mr,
}) => {
  const { componentProps } = useUIContext();
  const gradientDefaults = componentProps.LinearGradient || {};

  const mergedProps = {
    ...gradientDefaults,
    colors,
    direction,
  };

  // Get direction points
  const directionPoints = getDirectionPoints(mergedProps.direction);
  const finalStart = start || directionPoints.start;
  const finalEnd = end || directionPoints.end;

  // Build style array
  const gradientStyle: ViewStyle[] = Array.isArray(style) ? [...style] : style ? [style] : [];

  // Handle width/height shortcuts
  const finalWidth = size ?? width ?? w;
  const finalHeight = size ?? height ?? h;
  const finalPadding = padding ?? p;
  const finalMargin = margin ?? m;

  // Add layout props
  if (finalWidth !== undefined) gradientStyle.push({ width: finalWidth });
  if (finalHeight !== undefined) gradientStyle.push({ height: finalHeight });
  if (flex !== undefined) gradientStyle.push({ flex });
  if (opacity !== undefined) gradientStyle.push({ opacity });

  // Add padding
  if (finalPadding !== undefined) gradientStyle.push({ padding: finalPadding });
  if (pv !== undefined) gradientStyle.push({ paddingVertical: pv });
  if (ph !== undefined) gradientStyle.push({ paddingHorizontal: ph });
  if (pt !== undefined) gradientStyle.push({ paddingTop: pt });
  if (pb !== undefined) gradientStyle.push({ paddingBottom: pb });
  if (pl !== undefined) gradientStyle.push({ paddingLeft: pl });
  if (pr !== undefined) gradientStyle.push({ paddingRight: pr });

  // Add margin
  if (finalMargin !== undefined) gradientStyle.push({ margin: finalMargin });
  if (mv !== undefined) gradientStyle.push({ marginVertical: mv });
  if (mh !== undefined) gradientStyle.push({ marginHorizontal: mh });
  if (mt !== undefined) gradientStyle.push({ marginTop: mt });
  if (mb !== undefined) gradientStyle.push({ marginBottom: mb });
  if (ml !== undefined) gradientStyle.push({ marginLeft: ml });
  if (mr !== undefined) gradientStyle.push({ marginRight: mr });

  // Add border radius
  if (radius || borderRadius) {
    gradientStyle.push({ borderRadius: borderRadius ?? 12 });
  }

  return (
    <LinearGradient
      colors={mergedProps.colors}
      style={gradientStyle}
      start={finalStart}
      end={finalEnd}
      locations={locations}
    >
      {children}
    </LinearGradient>
  );
};

export default LinearGradientComponent;
