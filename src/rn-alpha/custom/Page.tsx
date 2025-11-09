import React, { useMemo } from 'react';
import { StatusBar, StatusBarStyle, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import View, { CustomViewProps, SpacingProps, PositionProps } from '../default/View';
import useColor from 'hooks/use-color.ts';
import { ColorProps } from '../../constants/colors';

export type PageProps = CustomViewProps & SpacingProps & PositionProps & {
  statusBarStyle?: StatusBarStyle;
  statusBarColor?: ColorProps | string;
  statusTextColor?: 'light' | 'dark' | StatusBarStyle;
  // New props for edge-to-edge support
  edgeToEdge?: boolean;
  statusBarTranslucent?: boolean;
  // Enhanced safe area control
  safeAreaMode?: 'auto' | 'manual' | 'none';
  customInsets?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
};

const Page: React.FC<PageProps> = ({
  children,
  statusBarStyle,
  statusBarColor,
  statusTextColor,
  color = 'background',
  flex = 1,
  // New props
  edgeToEdge = true,
  statusBarTranslucent = true,
  safeAreaMode = 'auto',
  customInsets,
  // View props
  style,
  pt, pb, pl, pr, // padding props
  ...rest
}) => {
  const { colors, colorMode } = useColor();
  const insets = useSafeAreaInsets();

  // Enhanced status bar color resolution
  const resolvedStatusColor = useMemo(() => {
    if (statusBarColor) {
      return typeof statusBarColor === 'string' && colors[statusBarColor as ColorProps]
        ? colors[statusBarColor as ColorProps]
        : statusBarColor;
    }

    if (edgeToEdge) {
      return 'transparent';
    }

    return typeof color === 'string' && colors[color as ColorProps]
      ? colors[color as ColorProps]
      : undefined;
  }, [statusBarColor, color, colors, edgeToEdge]);

  // Enhanced status bar style inference
  const inferredStatusStyle: StatusBarStyle = useMemo(() => {
    if (statusTextColor === 'light') return 'light-content';
    if (statusTextColor === 'dark') return 'dark-content';
    if (statusTextColor) return statusTextColor as StatusBarStyle;

    // Auto-detect based on background color brightness
    if (edgeToEdge && resolvedStatusColor === 'transparent') {
      return colorMode === 'dark' ? 'light-content' : 'dark-content';
    }

    return colorMode === 'dark' ? 'light-content' : 'dark-content';
  }, [statusTextColor, colorMode, edgeToEdge, resolvedStatusColor]);

  // Safe area insets based on mode
  const safeAreaPadding = useMemo(() => {
    if (safeAreaMode === 'none') return {};

    if (safeAreaMode === 'manual' && customInsets) {
      return {
        pt: customInsets.top ?? pt,
        pb: customInsets.bottom ?? pb,
        pl: customInsets.left ?? pl,
        pr: customInsets.right ?? pr,
      };
    }

    // Auto mode - apply safe area insets
    return {
      pt: pt ?? insets.top,
      pb: pb ?? insets.bottom,
      pl: pl ?? insets.left,
      pr: pr ?? insets.right,
    };
  }, [safeAreaMode, customInsets, insets, pt, pb, pl, pr]);

  const barStyle: StatusBarStyle = statusBarStyle ?? inferredStatusStyle;

  return (
    <>
      <StatusBar
        translucent={statusBarTranslucent}
        barStyle={barStyle}
        backgroundColor={Platform.OS === 'android' ? resolvedStatusColor : undefined}
      />
      <View
        color={color}
        flex={flex}
        style={style}
        {...safeAreaPadding}
        {...rest}
      >
        {children}
      </View>
    </>
  );
};

export default Page;
