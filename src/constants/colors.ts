import {ColorModes} from 'types';

const keys = {
  primary: '#0095E0',
  primaryLight: '#57A4FF1A',
  primaryShade: '#b2ddf8',
  secondary: '#102441',
  tertiary: '#BEBEBE',
  danger: '#FE0000',
  dangerLight: '#FF00331E',
  success: 'green',
  warning: '#FAA417',
  warningLight: 'rgba(250, 164, 23, 0.08)',
  medium: '#92949c',
  mediumShade: '#e6ecf0',
  mediumTint: '#9d9fa6',
  dark: '#242526',
  darkShade: '#3a3b3c',
  darkTint: '#191a1b',
  light: '#ffffff',
  lightShade: '#f9f9fd',
  lightTint: '#f5f6f9',
  modal: 'rgba(0,0,0,0.5)',
  overlay: 'rgba(0,0,0,0.21)',
  transparent: 'rgba(245,246,249,0)',
  placeholder: '#92949c',
  dim: '#15202b',
  orange: '#f7d5ad',
  wood: '#f6efd6',
  black: '#000000',
  cover: '#434C6D',
};

export const scheme = {
  light: {
    ...keys,
    text: keys.black,
    text2: '#636A64',
    background: keys.light,
    border: 'rgba(153, 153, 153, 0.24)',
    shade: 'rgba(113, 159, 228, 0.12)',
    touchable: keys.mediumShade,
    gap: '#f9f9fd',
    tint: keys.lightTint,
    check: keys.primary,
    navigation: '#f9f9fd',
    progress: '#e6ecf0',
    chat: keys.primary,
    spotlight: '#F1F6FA',
  },
  dark: {
    ...keys,
    primaryLight: keys.darkShade,
    text: '#f4f5f8',
    text2: '#91949B',
    background: keys.dark,
    border: '#38444d',
    shade: keys.darkShade,
    touchable: keys.darkTint,
    gap: keys.darkTint,
    mediumShade: '#3a3b3c',
    tint: keys.darkTint,
    check: keys.light,
    navigation: keys.darkTint,
    progress: keys.darkShade,
    chat: '#ffffff',
    spotlight: 'rgb(24,24,25)',
  },
};

export type ColorsProps = (typeof scheme)['light'];
export type ColorProps = keyof (typeof scheme)['light'];

const Colors = (value: ColorModes): ColorsProps => {
  return scheme[value];
};
export default Colors;
