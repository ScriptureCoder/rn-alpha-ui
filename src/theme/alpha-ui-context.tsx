import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Colors, { ColorsProps } from '../constants/colors';
import { ColorModes, PartialDeep } from '../types';
import {
  ComponentProps,
  getAllComponentProps,
  mergeComponentProps,
} from './component-props';

type ColorOverrides = PartialDeep<Record<ColorModes, ColorsProps>>;

export type FontFamilyConfig = {
  base?: string;
  custom?: string;
  regular?: string;
  bold?: string;
  semiBold?: string;
  light?: string;
  medium?: string;
  extraLight?: string;
  italic?: string;
  extraBold?: string;
};

export type AlphaUIContextValue = {
  colors: ColorsProps;
  colorMode: ColorModes;
  setColorMode: (mode: ColorModes) => void;
  systemColor: boolean;
  setSystemColor: (value: boolean) => void;
  componentProps: ComponentProps;
  fontFamily: FontFamilyConfig;
};

export type AlphaUIProviderProps = {
  initialMode?: ColorModes;
  mode?: ColorModes;
  onModeChange?: (mode: ColorModes) => void;
  systemColor?: boolean;
  customColors?: ColorOverrides;
  componentProps?: ComponentProps;
  fontFamily?: FontFamilyConfig;
  children: React.ReactNode;
};

export type ColorProviderProps = AlphaUIProviderProps;
export type UIProviderProps = AlphaUIProviderProps;

const defaultMode: ColorModes = 'light';

const defaultFontFamily: FontFamilyConfig = {
  regular: 'NunitoSans-Regular',
  bold: 'NunitoSans-Bold',
  semiBold: 'NunitoSans-SemiBold',
  light: 'NunitoSans-Light',
  medium: 'NunitoSans-Medium',
  extraLight: 'NunitoSans-ExtraLight',
  italic: 'NunitoSans-Italic',
  extraBold: 'NunitoSans-ExtraBold',
};

const mergeColors = (
  mode: ColorModes,
  overrides?: ColorOverrides,
): ColorsProps => {
  const base = Colors(mode);
  const override = overrides?.[mode];

  if (!override) {
    return base;
  }

  return {
    ...base,
    ...override,
  };
};

const defaultContextValue: AlphaUIContextValue = {
  colors: Colors(defaultMode),
  colorMode: defaultMode,
  setColorMode: () => {},
  systemColor: false,
  setSystemColor: () => {},
  componentProps: getAllComponentProps(),
  fontFamily: defaultFontFamily,
};

const AlphaUIContext = createContext<AlphaUIContextValue>(defaultContextValue);

export const AlphaUIProvider: React.FC<AlphaUIProviderProps> = ({
  initialMode = defaultMode,
  mode,
  onModeChange,
  systemColor: initialSystemColor = false,
  customColors,
  componentProps,
  fontFamily,
  children,
}) => {
  const [colorMode, setColorModeState] = useState<ColorModes>(initialMode);
  const [systemColor, setSystemColorState] = useState<boolean>(initialSystemColor);

  const isModeControlled = mode !== undefined;
  const currentMode = isModeControlled ? mode : colorMode;

  useEffect(() => {
    if (!isModeControlled) {
      setColorModeState(initialMode);
    }
  }, [initialMode, isModeControlled]);

  const setColorMode = useCallback(
    (nextMode: ColorModes) => {
      if (!isModeControlled) {
        setColorModeState(nextMode);
      }
      onModeChange?.(nextMode);
    },
    [isModeControlled, onModeChange],
  );

  const setSystemColor = useCallback((value: boolean) => {
    setSystemColorState(value);
  }, []);

  const colors = useMemo(
    () => mergeColors(currentMode, customColors),
    [currentMode, customColors],
  );

  const componentPropsConfig = useMemo(
    () => mergeComponentProps(getAllComponentProps(), componentProps ?? {}),
    [componentProps],
  );

  const fontFamilyConfig = useMemo(
    () => ({
      ...defaultFontFamily,
      ...fontFamily,
    }),
    [fontFamily],
  );

  const value = useMemo<AlphaUIContextValue>(
    () => ({
      colors,
      colorMode: currentMode,
      setColorMode,
      systemColor,
      setSystemColor,
      componentProps: componentPropsConfig,
      fontFamily: fontFamilyConfig,
    }),
    [
      colors,
      currentMode,
      setColorMode,
      systemColor,
      setSystemColor,
      componentPropsConfig,
      fontFamilyConfig,
    ],
  );

  return (
    <SafeAreaProvider>
      <AlphaUIContext.Provider value={value}>{children}</AlphaUIContext.Provider>
    </SafeAreaProvider>
  );
};

export const ColorProvider = AlphaUIProvider;
export const UIProvider = AlphaUIProvider;

export const useAlphaUIContext = (): AlphaUIContextValue => useContext(AlphaUIContext);
export const useColorContext = useAlphaUIContext;
export const useUIContext = useAlphaUIContext;

export type UIContextValue = AlphaUIContextValue;
