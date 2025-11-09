import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useColor from './use-color.ts';

export const usePageConfig = (options?: {
  edgeToEdge?: boolean;
  statusBarColor?: string;
}) => {
  const insets = useSafeAreaInsets();
  const { colors, colorMode } = useColor();

  return {
    insets,
    colors,
    colorMode,
    isEdgeToEdge: options?.edgeToEdge ?? true,
    statusBarColor: options?.statusBarColor,
  };
};
