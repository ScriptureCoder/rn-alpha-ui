import { Dimensions, Platform, StatusBar } from "react-native";

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;
export const ios = Platform.OS==="ios";
export const android = Platform.OS==="android";
export const isSmallDevice = width < 375;
export const statusHeight = ios?StatusBar.currentHeight||42:0;
