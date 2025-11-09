import React, { useMemo, useCallback } from 'react';
import { TouchableHighlightProps, TouchableHighlight as Touch, ViewStyle, AccessibilityRole } from "react-native";
import { ColorProps } from "../../constants/colors";
import useColor from "hooks/use-color.ts";
import { useUIContext } from '../../theme/alpha-ui-context';

export type SpacingProps = {
  padding?: number | string;
  margin?: number | string;
  p?: number | string;
  m?: number | string;
  ph?: number; pv?: number; pt?: number; pb?: number; pl?: number; pr?: number;
  mh?: number; mv?: number; mt?: number; mb?: number; ml?: number; mr?: number;
  px?: number; py?: number;
}

export type LayoutProps = {
  flex?: number;
  width?: number | string;
  height?: number | string;
  w?: number | string;
  h?: number | string;
  minW?: number | string;
  maxW?: number | string;
  minH?: number | string;
  maxH?: number | string;
  size?: number | string;
  fullWidth?: boolean;
  fullHeight?: boolean;
  center?: boolean;
  centerX?: boolean;
  centerY?: boolean;
  absolute?: boolean;
  relative?: boolean;
  hidden?: boolean;
  visible?: boolean;
  disabled?: boolean;
}

export type BorderProps = {
  br?: number;
  bc?: ColorProps | string;
  bw?: number;
  bbw?: number;
  btw?: number;
  blw?: number;
  brw?: number;
  brc?: ColorProps | string;
  blc?: ColorProps | string;
  btc?: ColorProps | string;
  bbc?: ColorProps | string;
  btrr?: number;
  btlr?: number;
  bbrr?: number;
  bblr?: number;
  bs?: "solid" | "dotted" | "dashed";
}

export type AnimationProps = {
  opacity?: number;
  scale?: number;
  rotate?: number;
  translateX?: number;
  translateY?: number;
  skewX?: number;
  skewY?: number;
  perspective?: number;
}

export type TouchableHighlightCustomProps = {
  // Color props (simplified)
  color?: ColorProps | string;
  backgroundColor?: ColorProps | string;
  underlayColor?: ColorProps | string;

  // Animation props (simplified)
  opacity?: number;
  scale?: number;
  rotate?: number;
  translateX?: number;
  translateY?: number;
  skewX?: number;
  skewY?: number;
  perspective?: number;
}

export type Props = TouchableHighlightProps & SpacingProps & LayoutProps & BorderProps & AnimationProps & TouchableHighlightCustomProps;

const TouchableHighlight = React.forwardRef<any, Props>((props, ref) => {
  const { colors } = useColor();
  const { componentProps } = useUIContext();
  const touchableDefaults = componentProps.TouchableHighlight || {};

  const mergedProps = {
    ...touchableDefaults,
    ...props,
  };

  const {
    // Layout props
    w, h, size, flex,
    fullWidth, fullHeight,
    center, centerX, centerY,
    absolute, relative,
    hidden, visible, disabled,
    // Border props
    br, bc, bw, bbw, btw, blw, brw,
    brc, blc, btc, bbc,
    btrr, btlr, bbrr, bblr, bs,
    // Color props
    color, backgroundColor, underlayColor,
    // Animation props
    opacity, scale, rotate, translateX, translateY,
    skewX, skewY, perspective,
    // Spacing props
    padding, p, margin, m,
    mt, mb, mh, ml, mr, mv,
    pb, ph, pl, pv, pt, pr, px, py,
    // Other props (all standard TouchableHighlight props)
    style, children, ...otherProps
  } = mergedProps;

  // Memoized color resolver for better performance
  const resolveColor = useCallback((colorValue?: ColorProps | string) => {
    if (!colorValue) return undefined;
    return colors[colorValue as ColorProps] || colorValue;
  }, [colors]);

  // Memoized style calculation for better performance
  const computedStyle = useMemo(() => {

    // Handle width/height shortcuts
    let finalWidth = size ?? w;
    let finalHeight = size ?? h;

    if (fullWidth) finalWidth = '100%';
    if (fullHeight) finalHeight = '100%';

    // Handle center shortcuts
    let centerStyles = {};
    if (center) {
      centerStyles = { alignItems: 'center', justifyContent: 'center' };
    } else {
      if (centerX) centerStyles = { ...centerStyles, alignItems: 'center' };
      if (centerY) centerStyles = { ...centerStyles, justifyContent: 'center' };
    }

    // Handle spacing shortcuts
    let finalPadding = padding ?? p;
    let finalMargin = margin ?? m;

    // Transform array for animations
    const transform = [];
    if (scale) transform.push({ scale });
    if (translateX) transform.push({ translateX });
    if (translateY) transform.push({ translateY });
    if (rotate) transform.push({ rotate: `${rotate}deg` });
    if (skewX) transform.push({ skewX: `${skewX}deg` });
    if (skewY) transform.push({ skewY: `${skewY}deg` });

    // Handle visibility
    let finalOpacity = opacity;
    if (hidden) finalOpacity = 0;
    if (visible) finalOpacity = 1;
    if (disabled) finalOpacity = 0.5;

    // Handle position
    let finalPosition: 'absolute' | 'relative' | 'static' | undefined = undefined;
    if (absolute) finalPosition = 'absolute';
    if (relative) finalPosition = 'relative';

    // Create base view style
    const viewStyle: ViewStyle = {
      flex,
      width: finalWidth as any, // Cast to any to handle string values like '100%'
      height: finalHeight as any, // Cast to any to handle string values like '100%'
      borderRadius: br,
      backgroundColor: resolveColor(backgroundColor),
      ...centerStyles,
      // Spacing
      padding: finalPadding as any, // Cast to any to handle string values
      margin: finalMargin as any, // Cast to any to handle string values
      marginTop: mt,
      marginBottom: mb,
      marginRight: mr,
      marginLeft: ml,
      marginHorizontal: mh,
      marginVertical: mv,
      paddingTop: pt,
      paddingBottom: pb,
      paddingVertical: pv ?? py,
      paddingHorizontal: ph ?? px,
      paddingLeft: pl,
      paddingRight: pr,
      // Position
      position: finalPosition,
      // Border
      borderWidth: bw,
      borderBottomWidth: bbw,
      borderTopWidth: btw,
      borderLeftWidth: blw,
      borderRightWidth: brw,
      borderColor: resolveColor(bc),
      borderRightColor: resolveColor(brc),
      borderLeftColor: resolveColor(blc),
      borderTopColor: resolveColor(btc),
      borderBottomColor: resolveColor(bbc),
      borderTopRightRadius: btrr,
      borderTopLeftRadius: btlr,
      borderBottomLeftRadius: bblr,
      borderBottomRightRadius: bbrr,
      borderStyle: bs,
      // Animation
      opacity: finalOpacity,
      transform: transform.length > 0 ? transform : undefined,
    };

    return viewStyle;
  }, [
    w, h, size, flex, fullWidth, fullHeight,
    center, centerX, centerY, absolute, relative,
    hidden, visible, disabled,
    br, bc, bw, bbw, btw, blw, brw,
    brc, blc, btc, bbc, btrr, btlr, bbrr, bblr, bs,
    color, backgroundColor, opacity, scale, rotate,
    translateX, translateY, skewX, skewY, perspective,
    padding, p, margin, m, mt, mb, mh, ml, mr, mv,
    pb, ph, pl, pv, pt, pr, px, py,
    resolveColor
  ]);

  // Memoized underlay color
  const finalUnderlayColor = useMemo(() => {
    if (underlayColor) {
      return colors[underlayColor as ColorProps] || underlayColor;
    }
    return colors.shade;
  }, [underlayColor, colors]);

  return (
    <Touch
      ref={ref}
      {...otherProps}
      style={[computedStyle, style]}
      underlayColor={finalUnderlayColor}
    >
      {children}
    </Touch>
  );
});

TouchableHighlight.displayName = 'TouchableHighlight';

export default TouchableHighlight;
