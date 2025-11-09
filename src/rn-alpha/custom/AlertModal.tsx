import React, { useMemo } from 'react';
import { Modal, ModalProps as RNModalProps, ViewStyle, TextStyle, AccessibilityRole } from "react-native";
import KeyboardView from "../default/KeyboardView";
import View from "../default/View";
import { Button, Svg, Text } from '..';
import { ModalProps } from "types";
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

export interface AlertModalCustomProps extends ModalProps {
  // Content props
  title: string;
  text?: string;
  icon?: string;
  color?: "primary" | "secondary" | "danger" | "success" | "warning" | "info";

  // Button props
  confirm?: string;
  cancel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmDisabled?: boolean;
  cancelDisabled?: boolean;

  // Modal props
  animationType?: "none" | "slide" | "fade";
  transparent?: boolean;
  presentationStyle?: "fullScreen" | "pageSheet" | "formSheet" | "overFullScreen";
  statusBarTranslucent?: boolean;

  // Styling props
  modalStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  titleStyle?: TextStyle;
  textStyle?: TextStyle;
  buttonContainerStyle?: ViewStyle;

  // Accessibility
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: AccessibilityRole;


  // Custom content
  customContent?: React.ReactNode;
  customButtons?: React.ReactNode;

  // Keyboard handling
  keyboardAvoidingView?: boolean;
  keyboardVerticalOffset?: number;

  // Backdrop
  backdropColor?: ColorProps | string;
  backdropOpacity?: number;
  closeOnBackdropPress?: boolean;
}

export type Props = AlertModalCustomProps & SpacingProps & LayoutProps & BorderProps & AnimationProps & {
  style?: ViewStyle;
};

const AlertModal: React.FC<Props> = (props) => {
  const { colors } = useColor();

  const {
    // Content props
    title,
    text,
    icon,
    color = "primary",
    // Button props
    confirm = "Done",
    cancel = "Cancel",
    onConfirm,
    onCancel,
    confirmDisabled = false,
    cancelDisabled = false,
    // Modal props
    modal,
    setModal,
    animationType = "none",
    transparent = true,
    presentationStyle,
    statusBarTranslucent,
    // Styling props
    modalStyle,
    contentStyle,
    titleStyle,
    textStyle,
    buttonContainerStyle,
    // Accessibility
    accessibilityLabel,
    accessibilityHint,
    accessibilityRole,
    // Custom content
    customContent,
    customButtons,
    // Keyboard handling
    keyboardAvoidingView = true,
    keyboardVerticalOffset,
    // Backdrop
    backdropColor,
    backdropOpacity = 0.5,
    closeOnBackdropPress = true,
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
      maxWidth: 400,
      flex: 1,
      ...contentStyle,
    };
  }, [contentStyle]);

  // Memoized title style
  const computedTitleStyle = useMemo(() => {
    return {
      fontSize: 16,
      fontWeight: "600" as const,
      textAlign: "center" as const,
      ...titleStyle,
    };
  }, [titleStyle]);

  // Memoized text style
  const computedTextStyle = useMemo(() => {
    return {
      fontSize: 13,
      textAlign: "center" as const,
      ...textStyle,
    };
  }, [textStyle]);

  // Memoized button container style
  const computedButtonContainerStyle = useMemo(() => {
    return {
      gap: 12,
      ...buttonContainerStyle,
    };
  }, [buttonContainerStyle]);

  // Handle backdrop press
  const handleBackdropPress = () => {
    if (closeOnBackdropPress) {
      closeFunc();
    }
  };

  // Handle confirm press
  const handleConfirmPress = () => {
    closeFunc();
    onConfirm?.();
  };

  // Handle cancel press
  const handleCancelPress = () => {
    closeFunc();
    onCancel?.();
  };

  // Memoized modal content
  const modalContent = useMemo(() => {
    if (customContent) {
      return customContent;
    }

    return (
      <View color={"background"} ph={24} pt={24} pb={5} br={24} style={computedContentStyle} gap={24}>
        {icon && (
          <View size={40} br={40} color={`${color}Light`} align={"center"} fd={"flex-center"}>
            <Svg icon={icon} size={22} color={color} />
          </View>
        )}

        <View gap={16}>
          <Text style={computedTitleStyle} color={"text"}>
            {title}
          </Text>
          {text && (
            <Text style={computedTextStyle} color={"text2"}>
              {text}
            </Text>
          )}
        </View>

        {customButtons ? (
          customButtons
        ) : (
          <View style={computedButtonContainerStyle}>
            <Button
              title={confirm}
              onPress={handleConfirmPress}
              color={color}
              disabled={confirmDisabled}
            />
            <Button
              title={cancel}
              onPress={handleCancelPress}
              color={"background"}
              textColor={"text"}
              disabled={cancelDisabled}
            />
          </View>
        )}
      </View>
    );
  }, [
    customContent, customButtons, icon, color, title, text,
    computedContentStyle, computedTitleStyle, computedTextStyle,
    computedButtonContainerStyle, confirm, cancel, confirmDisabled, cancelDisabled,
    handleConfirmPress, handleCancelPress
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
        <KeyboardView keyboardVerticalOffset={keyboardVerticalOffset}>
          <View flex={1} style={backdropStyle} fd={"flex-center"} p={25}>
            {modalContent}
            <View inset={0} onTouchEnd={handleBackdropPress} />
          </View>
        </KeyboardView>
      ) : (
        <View flex={1} style={backdropStyle} fd={"flex-center"} p={25}>
          {modalContent}
          <View inset={0} onTouchEnd={handleBackdropPress} />
        </View>
      )}
    </Modal>
  );
};

export default AlertModal;
