import React, { PropsWithChildren, useMemo } from "react";
import { TouchableNativeFeedback as Touch, ViewStyle, AccessibilityRole } from "react-native";
import { ColorProps } from "../../constants/colors";
import useColor from "hooks/use-color.ts";

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

export type TouchableNativeFeedbackCustomProps = {
  // Layout props
  w?: number | string;
  h?: number | string;
  size?: number | string;
  flex?: number;
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

  // Border props
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

  // Color props
  color?: ColorProps | string;
  backgroundColor?: ColorProps | string;
  rippleColor?: ColorProps | string;

  // Animation props
  opacity?: number;
  scale?: number;
  rotate?: number;
  translateX?: number;
  translateY?: number;
  skewX?: number;
  skewY?: number;
  perspective?: number;

  // Touchable specific props
  borderless?: boolean;
  onPress: () => void;
  onLongPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  hitSlop?: { top?: number; bottom?: number; left?: number; right?: number };
  pressRetentionOffset?: { top?: number; bottom?: number; left?: number; right?: number };
  delayPressIn?: number;
  delayPressOut?: number;
  delayLongPress?: number;

  // Accessibility
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: AccessibilityRole;
  accessibilityState?: {
    disabled?: boolean;
    selected?: boolean;
    checked?: boolean | 'mixed';
    busy?: boolean;
    expanded?: boolean;
  };

}

export type Props = PropsWithChildren<TouchableNativeFeedbackCustomProps & SpacingProps & LayoutProps & BorderProps & AnimationProps> & {
  style?: any;
};

const TouchableNativeFeedback: React.FC<Props> = (props) => {
  const { colors } = useColor();

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
    color, backgroundColor, rippleColor,
    // Animation props
    opacity, scale, rotate, translateX, translateY,
    skewX, skewY, perspective,
    // Touchable props
    borderless = false,
    onPress, onLongPress, onPressIn, onPressOut,
    hitSlop, pressRetentionOffset,
    delayPressIn, delayPressOut, delayLongPress,
    // Accessibility
    accessibilityLabel, accessibilityHint, accessibilityRole, accessibilityState,
    // Spacing props
    padding, p, margin, m,
    mt, mb, mh, ml, mr, mv,
    pb, ph, pl, pv, pt, pr, px, py,
    // Other props
    style, children, ...otherProps
  } = props;

  // Memoized style calculation for better performance
  const computedStyle = useMemo(() => {
    // Helper function to resolve colors
    const resolveColor = (colorValue?: ColorProps | string) => {
      if (!colorValue) return undefined;
      return colors[colorValue as ColorProps] || colorValue;
    };

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
    colors
  ]);

  // Memoized ripple background
  const rippleBackground = useMemo(() => {
    const rippleColorValue = rippleColor ? colors[rippleColor as ColorProps] || rippleColor : colors.shade;
    return Touch.Ripple(rippleColorValue, borderless);
  }, [rippleColor, borderless, colors]);

  return (
    <Touch
      {...otherProps}
      background={rippleBackground}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled}
      hitSlop={hitSlop}
      pressRetentionOffset={pressRetentionOffset}
      delayPressIn={delayPressIn}
      delayPressOut={delayPressOut}
      delayLongPress={delayLongPress}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityState}
      style={[computedStyle, style]}
    >
      {children}
    </Touch>
  );
};

export default TouchableNativeFeedback;
