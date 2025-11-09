import React, { useMemo, useCallback } from 'react';
import {
  Animated,
  RefreshControl,
  ScrollView as Scroll,
  ScrollViewProps,
  ViewStyle,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
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

export type ScrollProps = {
  // Scroll indicators (simplified)
  svs?: boolean; // showsVerticalScrollIndicator
  shs?: boolean; // showsHorizontalScrollIndicator

  // Content styling (simplified)
  cs?: ViewStyle; // contentContainerStyle
  contentPadding?: number | string;
  contentPaddingHorizontal?: number;
  contentPaddingVertical?: number;
  contentPaddingTop?: number;
  contentPaddingBottom?: number;
  contentPaddingLeft?: number;
  contentPaddingRight?: number;

  // Animation props (simplified)
  scrollX?: Animated.Value;
  scrollY?: Animated.Value;
  opacity?: number;
  scale?: number;
  rotate?: number;
  translateX?: number;
  translateY?: number;

  // Refresh control styling (simplified)
  refreshColor?: ColorProps | string;
  refreshTintColor?: ColorProps | string;
  refreshTitle?: string;
  refreshTitleColor?: ColorProps | string;
}

export type Props = ScrollViewProps & SpacingProps & LayoutProps & ScrollProps;

const ScrollView = React.forwardRef<Scroll, Props>((props, ref) => {
  const { colors } = useColor();
  const { componentProps } = useUIContext();
  const scrollViewDefaults = componentProps.ScrollView || {};

  const mergedProps = {
    ...scrollViewDefaults,
    ...props,
  };

  const {
    // Spacing props
    padding, p,
    margin, m,
    mt, mb, mh, ml, mr, mv,
    pb, ph, pl, pv, pt, pr,
    px, py,
    // Layout props
    flex,
    width, w,
    height, h,
    minW, maxW, minH, maxH,
    fullWidth, fullHeight,
    center, centerX, centerY,
    absolute, relative,
    hidden, visible, disabled,
    // Scroll custom props (simplified)
    svs,
    shs,
    cs,
    contentPadding,
    contentPaddingHorizontal,
    contentPaddingVertical,
    contentPaddingTop,
    contentPaddingBottom,
    contentPaddingLeft,
    contentPaddingRight,
    scrollX,
    scrollY,
    refreshColor,
    refreshTintColor,
    refreshTitle,
    refreshTitleColor,
    // Animation props
    opacity,
    scale,
    rotate,
    translateX,
    translateY,
    // Other props (all standard ScrollView props)
    style,
    children,
    ...otherProps
  } = mergedProps;

  // Memoized color resolver for better performance
  const resolveColor = useCallback((colorValue?: ColorProps | string) => {
    if (!colorValue) return undefined;
    return colors[colorValue as ColorProps] || colorValue;
  }, [colors]);

  // Memoized style calculation for better performance
  const computedStyle = useMemo(() => {

    // Handle width/height shortcuts
    let finalWidth = width ?? w;
    let finalHeight = height ?? h;

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

    // Handle visibility
    let finalOpacity = opacity;
    if (hidden) finalOpacity = 0;
    if (visible) finalOpacity = 1;
    if (disabled) finalOpacity = 0.5;

    // Handle position
    let finalPosition = undefined;
    if (absolute) finalPosition = 'absolute';
    if (relative) finalPosition = 'relative';

    return {
      flex,
      width: finalWidth,
      height: finalHeight,
      minWidth: minW,
      maxWidth: maxW,
      minHeight: minH,
      maxHeight: maxH,
      ...centerStyles,
      // Spacing
      padding: finalPadding,
      margin: finalMargin,
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
      // Layout
      position: finalPosition,
      opacity: finalOpacity,
      transform: transform.length > 0 ? transform : undefined,
    };
  }, [
    flex, width, w, height, h, minW, maxW, minH, maxH,
    fullWidth, fullHeight, center, centerX, centerY,
    absolute, relative, hidden, visible, disabled,
    padding, p, margin, m, mt, mb, mh, ml, mr, mv,
    pb, ph, pl, pv, pt, pr, px, py,
    opacity, scale, rotate, translateX, translateY,
    resolveColor
  ]);

  // Memoized content container style
  const contentContainerStyle = useMemo(() => {
    const baseStyle = {
      paddingBottom: contentPaddingBottom ?? pb ?? 40,
      paddingTop: contentPaddingTop ?? pt ?? 0,
      paddingHorizontal: contentPaddingHorizontal ?? ph,
      paddingVertical: contentPaddingVertical ?? pv,
      paddingLeft: contentPaddingLeft ?? pl,
      paddingRight: contentPaddingRight ?? pr,
      padding: contentPadding,
    };

    return { ...baseStyle, ...cs };
  }, [
    contentPaddingBottom, pb, contentPaddingTop, pt,
    contentPaddingHorizontal, ph, contentPaddingVertical, pv,
    contentPaddingLeft, pl, contentPaddingRight, pr,
    contentPadding, cs
  ]);

  // Memoized refresh control
  const refreshControl = useMemo(() => {
    const { onRefresh, refreshing } = otherProps as any;
    if (!onRefresh) return undefined;

    return (
      <RefreshControl
        refreshing={refreshing || false}
        onRefresh={onRefresh}
        tintColor={refreshTintColor ? resolveColor(refreshTintColor) : undefined}
        colors={refreshColor ? [resolveColor(refreshColor)] : undefined}
        title={refreshTitle}
        titleColor={refreshTitleColor ? resolveColor(refreshTitleColor) : undefined}
      />
    );
  }, [refreshTintColor, refreshColor, refreshTitle, refreshTitleColor, resolveColor, otherProps]);

  // Determine if we need Animated.ScrollView
  const animated = scrollX || scrollY;
  const Comp = animated ? Animated.ScrollView : Scroll;

  // Handle scroll events
  const handleScroll = useMemo(() => {
    const { onScroll } = otherProps as any;
    if (animated && (scrollX || scrollY)) {
      return Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                x: scrollX,
                y: scrollY,
              },
            },
          },
        ],
        { useNativeDriver: true, listener: onScroll }
      );
    }
    return onScroll;
  }, [animated, scrollX, scrollY, otherProps]);

  return (
    <Comp
      ref={ref}
      {...otherProps}
      style={[computedStyle, style] as any}
      contentContainerStyle={contentContainerStyle as any}
      refreshControl={refreshControl}
      onScroll={handleScroll}
      showsVerticalScrollIndicator={svs}
      showsHorizontalScrollIndicator={shs}
    >
      {children}
    </Comp>
  );
});

ScrollView.displayName = 'ScrollView';

export default ScrollView;
