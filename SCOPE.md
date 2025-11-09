# @scripturecoder/rn-alpha-ui - Project Scope & Understanding

## Overview
This is a React Native UI component library extracted from `@scripturecoder/rn-alpha`. It provides a comprehensive set of themed, reusable UI components for React Native applications with built-in light/dark mode support and consistent styling system.

## Package Information
- **Name**: `@scripturecoder/rn-alpha-ui`
- **Version**: 0.0.6
- **Type**: React Native UI Component Library
- **Build System**: TypeScript + tsup
- **Target**: React Native >=0.73.0, React >=18.0.0

## Architecture & Structure

### 1. Core Architecture
The library follows a **context-based theming system** with:
- **AlphaUIProvider**: Main context provider for theme management
- **Component Props System**: Global default props configuration
- **Color System**: Light/dark mode with customizable color palettes
- **Safe Area Integration**: Built-in safe area handling

### 2. Directory Structure
```
src/
├── rn-alpha/           # Main component exports
│   ├── custom/        # Enhanced UI components
│   └── default/       # React Native component wrappers
├── theme/             # Theming system
├── hooks/             # Custom hooks
├── constants/         # Design tokens
├── utils/             # Utility functions
└── assets/            # Icons and images
```

### 3. Component Categories

#### **Layout Components**
- `Page` - Full-screen container with status bar and safe area handling
- `View` - Enhanced View with theme integration
- `SafeAreaView` - Safe area wrapper
- `ScrollView` - Themed scroll view
- `FlatList` - Enhanced FlatList
- `KeyboardView` - Keyboard-aware container

#### **Typography**
- `Text` - Enhanced Text with theme integration, font weight support, and animation props

#### **Interactive Components**
- `Button` - Themed button with loading states and icons
- `TouchableOpacity`, `TouchableHighlight`, `TouchableNativeFeedback` - Enhanced touchables
- `IconButton` - Icon-only button
- `FabButton` - Floating action button

#### **Input Components**
- `Input` - Base input component
- `TextInput` - Enhanced text input
- `Password` - Password input with visibility toggle
- `SearchInput` - Search input with clear functionality
- `PhoneNumberInput` - Phone number input with country selection
- `OtpInput` - OTP input component
- `DateSelect` - Date picker
- `DateTimeInput` - Date and time picker
- `Select` - Dropdown select
- `Switch` - Toggle switch
- `Checkbox` - Checkbox input
- `Label` - Input labels
- `ErrorText` - Error message display

#### **Modal & Overlay Components**
- `Modal` - Base modal component
- `AlertModal` - Alert dialog
- `OptionModal` - Option selection modal
- `OptionModalSimple` - Simplified option modal
- `PageModal` - Full-page modal
- `Sheet` - Bottom sheet
- `Menu` - Context menu

#### **Display Components**
- `Image` - Enhanced image component
- `ImageBackground` - Image background wrapper
- `Svg` - SVG icon component
- `LinearGradient` - Gradient background
- `Loader` - Loading indicator
- `Preloader` - Full-screen loader
- `ProgressBar` - Progress indicator
- `EmptyState` - Empty state display
- `ErrorView` - Error state display

## Theming System

### 1. Color System
```typescript
// Built-in color schemes
const scheme = {
  light: {
    primary: '#0095E0',
    background: '#ffffff',
    text: '#000000',
    // ... more colors
  },
  dark: {
    primary: '#0095E0',
    background: '#242526',
    text: '#f4f5f8',
    // ... more colors
  }
}
```

### 2. Context Provider
```typescript
<AlphaUIProvider
  initialMode="light"
  customColors={customColors}
  componentProps={componentProps}
>
  {children}
</AlphaUIProvider>
```

### 3. Component Props System
Global default props can be set for any component:
```typescript
const componentProps = {
  Text: {
    size: 16,
    color: 'text',
    fontFamily: 'Inter-Regular',
  },
  Button: {
    br: 8,
    pv: 15,
    weight: 'Bold',
  }
}
```

## Key Features

### 1. **Theme Integration**
- Light/dark mode support
- Custom color palettes
- Component-level theming
- System color mode detection

### 2. **Enhanced Props System**
- Shortened prop names (`pv` for paddingVertical, `br` for borderRadius)
- Consistent spacing system
- Typography weight system
- Animation props support

### 3. **Safe Area Handling**
- Automatic safe area insets
- Edge-to-edge support
- Status bar management
- Custom safe area configuration

### 4. **Animation Support**
- Built-in loading animations
- Transform animations (scale, rotate, translate)
- Smooth transitions

### 5. **Accessibility**
- Font scaling support
- Screen reader compatibility
- Touch target optimization

## Dependencies

### Core Dependencies
- `react-native-safe-area-context` - Safe area handling
- `react-native-svg` - SVG support
- `react-native-linear-gradient` - Gradient backgrounds
- `@gorhom/bottom-sheet` - Bottom sheet functionality
- `react-native-date-picker` - Date picker
- `react-native-otp-entry` - OTP input
- `dayjs` - Date manipulation

### Peer Dependencies
- `react` >=18.0.0
- `react-native` >=0.73.0

## Usage Patterns

### 1. **Basic Setup**
```typescript
import { AlphaUIProvider, Page, Text, Button } from '@scripturecoder/rn-alpha-ui';

const App = () => (
  <AlphaUIProvider initialMode="light">
    <Page>
      <Text size={24} weight="Bold">Welcome</Text>
      <Button title="Get Started" onPress={() => {}} />
    </Page>
  </AlphaUIProvider>
);
```

### 2. **Custom Theming**
```typescript
const customColors = {
  light: {
    primary: '#3B82F6',
    background: '#F9FBFF',
    text: '#0F172A',
  },
  dark: {
    primary: '#60A5FA',
    background: '#0F172A',
    text: '#E2E8F0',
  },
};
```

### 3. **Component Defaults**
```typescript
const componentProps = {
  Text: { size: 16, color: 'text' },
  Button: { br: 8, pv: 15 },
};
```

## Build System

### 1. **TypeScript Configuration**
- Target: ES2019
- Module: ESNext
- JSX: react-jsx
- Path mapping for clean imports

### 2. **Build Process**
- `tsup` for bundling
- Multiple output formats (CommonJS, ESModule)
- Type definitions generation
- Source maps

### 3. **Publishing**
- Automated build on prepare
- Version management
- Public npm access

## Development Guidelines

### 1. **Component Development**
- Use `useColor` hook for theme access
- Implement component props system
- Support both theme colors and custom values
- Include proper TypeScript types

### 2. **Styling Patterns**
- Use shortened prop names for common properties
- Support both theme tokens and direct values
- Implement responsive design considerations
- Follow accessibility guidelines

### 3. **Testing Considerations**
- Test both light and dark modes
- Verify safe area handling
- Test component prop overrides
- Validate accessibility features

## Key Files to Understand

1. **`src/theme/alpha-ui-context.tsx`** - Core theming system
2. **`src/constants/colors.ts`** - Color definitions
3. **`src/rn-alpha/custom/Button.tsx`** - Example component implementation
4. **`src/rn-alpha/default/Text.tsx`** - Typography system
5. **`src/hooks/use-color.ts`** - Theme access hook
6. **`src/theme/component-props.ts`** - Component props system

## Future Considerations

1. **Performance Optimization**
   - Memoization strategies
   - Bundle size optimization
   - Lazy loading components

2. **Feature Enhancements**
   - More animation options
   - Advanced layout components
   - Enhanced accessibility features

3. **Developer Experience**
   - Better TypeScript support
   - Storybook integration
   - Comprehensive documentation

This library provides a solid foundation for React Native applications with consistent theming, comprehensive component coverage, and excellent developer experience.
