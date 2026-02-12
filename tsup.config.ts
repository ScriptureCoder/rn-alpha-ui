import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  minify: false,
  external: [
    'react',
    'react-native',
    'react-native-gesture-handler',
    'react-native-reanimated',
    'react-native-safe-area-context',
    'react-native-svg',
    'react-native-linear-gradient',
    'react-native-date-picker',
    'react-native-otp-entry',
    'react-native-material-menu',
    'react-native-loader-kit',
    '@d11/react-native-fast-image',
    'country-code-emoji',
    'dayjs'
  ],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";'
    }
  }
});
