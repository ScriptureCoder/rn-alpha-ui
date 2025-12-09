import React, { useMemo } from 'react';
import { Modal, AccessibilityRole } from "react-native";
import { KEY, Svg, Text, TouchableOpacity, View } from '..';
import { ModalProps } from "types";
import { ColorProps } from "constants/colors.ts";
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

export interface OptionItem {
  label: string;
  text?: string;
  icon?: string;
  color?: ColorProps;
  onPress?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  loading?: boolean;
  badge?: string | number;
  rightIcon?: string;
  rightText?: string;
  style?: any;
  textStyle?: any;
  iconStyle?: any;
}

export interface OptionModalCustomProps extends ModalProps {
  // Options
  options: OptionItem[];

  // Modal props
  animationType?: "none" | "slide" | "fade";
  transparent?: boolean;
  presentationStyle?: "fullScreen" | "pageSheet" | "formSheet" | "overFullScreen";
  statusBarTranslucent?: boolean;

  // Styling props
  modalStyle?: any;
  contentStyle?: any;
  optionStyle?: any;
  optionTextStyle?: any;
  optionIconStyle?: any;

  // Layout props
  maxHeight?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  minWidth?: number | string;

  // Accessibility
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: AccessibilityRole;


  // Custom content
  customContent?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;

  // Behavior
  closeOnOptionPress?: boolean;
  closeOnBackdropPress?: boolean;

  // Keyboard handling
  keyboardAvoidingView?: boolean;
  keyboardVerticalOffset?: number;

  // Backdrop
  backdropColor?: ColorProps | string;
  backdropOpacity?: number;
}

export type Props = OptionModalCustomProps & SpacingProps & LayoutProps & BorderProps & AnimationProps & {
  style?: any;
};

const OptionModal: React.FC<Props> = (props) => {
  const { colors } = useColor();

  const {
    // Options
    options,
    // Modal props
    modal,
    setModal,
    animationType = "slide",
    transparent = true,
    presentationStyle,
    statusBarTranslucent,
    // Styling props
    modalStyle,
    contentStyle,
    optionStyle,
    optionTextStyle,
    optionIconStyle,
    // Layout props
    maxHeight,
    minHeight,
    maxWidth,
    minWidth,
    // Accessibility
    accessibilityLabel,
    accessibilityHint,
    accessibilityRole,
    // Custom content
    customContent,
    header,
    footer,
    // Behavior
    closeOnOptionPress = true,
    closeOnBackdropPress = true,
    // Keyboard handling
    keyboardAvoidingView = true,
    keyboardVerticalOffset,
    // Backdrop
    backdropColor,
    backdropOpacity = 0.5,
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
    // Animation props
    opacity, scale, rotate, translateX, translateY,
    skewX, skewY, perspective,
    // Spacing props
    padding, p, margin, m,
    mt, mb, mh, ml, mr, mv,
    pb, ph, pl, pv, pt, pr, px, py,
    // Other props
    style, ...otherProps
  } = props;

  // Memoized close function
  const closeFunc = useMemo(() => {
    return () => {
      setModal(false);
    };
  }, [setModal]);

  // Memoized backdrop style
  const backdropStyle = useMemo(() => {
    const backdropColorValue = backdropColor ? colors[backdropColor as ColorProps] || backdropColor : colors.modal;
    return {
      backgroundColor: backdropColorValue,
      opacity: backdropOpacity,
    };
  }, [backdropColor, backdropOpacity, colors]);

  // Memoized content style
  const computedContentStyle = useMemo(() => {
    return {
      maxWidth: maxWidth || 400,
      minWidth: minWidth || 280,
      maxHeight: maxHeight || '80%',
      minHeight: minHeight || 200,
      ...contentStyle,
    };
  }, [maxWidth, minWidth, maxHeight, minHeight, contentStyle]);

  // Memoized option style
  const computedOptionStyle = useMemo(() => {
    return {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      gap: 16,
      paddingHorizontal: 16,
      paddingVertical: 12,
      ...optionStyle,
    };
  }, [optionStyle]);

  // Memoized option text style
  const computedOptionTextStyle = useMemo(() => {
    return {
      fontSize: 13,
      ...optionTextStyle,
    };
  }, [optionTextStyle]);

  // Memoized option icon style
  const computedOptionIconStyle = useMemo(() => {
    return {
      width: 40,
      height: 40,
      borderRadius: 40,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      ...optionIconStyle,
    };
  }, [optionIconStyle]);

  // Handle option press
  const handleOptionPress = (item: OptionItem) => {
    if (item.disabled || item.loading) return;

    if (closeOnOptionPress) {
      closeFunc();
    }

    item.onPress?.();
  };

  // Handle backdrop press
  const handleBackdropPress = () => {
    if (closeOnBackdropPress) {
      closeFunc();
    }
  };

  // Memoized options list
  const optionsList = useMemo(() => {
    if (customContent) {
      return customContent;
    }

    return (
      <View color={"background"} br={24} style={computedContentStyle}>
        {header && (
          <View p={16} pb={8}>
            {header}
          </View>
        )}

        <View>
          {options.map((item, i) => (
            <TouchableOpacity
              key={KEY + i}
              onPress={() => handleOptionPress(item)}
              disabled={item.disabled || item.loading}
              style={computedOptionStyle}
            >
              {item.icon && (
                <View
                  size={40}
                  br={40}
                  color={item.color ? `${item.color}Light` : 'shade'}
                  style={computedOptionIconStyle}
                >
                  <Svg
                    icon={item.icon}
                    color={item.color || 'text'}
                    size={24}
                  />
                </View>
              )}

              <View flex={1}>
                <Text
                  size={13}
                  color={item.destructive ? 'danger' : 'text'}
                  style={computedOptionTextStyle}
                >
                  {item.label}
                </Text>
                {item.text && (
                  <Text size={12} color={"text2"}>
                    {item.text}
                  </Text>
                )}
              </View>

              {item.rightIcon && (
                <Svg icon={item.rightIcon} color="text2" size={16} />
              )}

              {item.rightText && (
                <Text size={12} color="text2">
                  {item.rightText}
                </Text>
              )}

              {item.badge && (
                <View
                  size={20}
                  br={10}
                  color="primary"
                  fd="flex-center"
                >
                  <Text size={10} color="white" weight="SemiBold">
                    {item.badge}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {footer && (
          <View p={16} pt={8}>
            {footer}
          </View>
        )}
      </View>
    );
  }, [
    customContent, header, footer, options, computedContentStyle,
    computedOptionStyle, computedOptionTextStyle, computedOptionIconStyle,
    handleOptionPress
  ]);

  return (
    <Modal
      animationType={animationType}
      transparent={transparent}
      visible={modal}
      onRequestClose={closeFunc}
      presentationStyle={presentationStyle}
      statusBarTranslucent={statusBarTranslucent}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
      style={modalStyle}
    >
      {keyboardAvoidingView ? (
        <>
          <View flex={1} style={backdropStyle} fd={"flex-center"} p={25}>
            {optionsList}
            <View inset={0} onTouchEnd={handleBackdropPress} />
          </View>
        </>
      ) : (
        <View flex={1} style={backdropStyle} fd={"flex-center"} p={25}>
          {optionsList}
          <View inset={0} onTouchEnd={handleBackdropPress} />
        </View>
      )}
    </Modal>
  );
};

export default OptionModal;
