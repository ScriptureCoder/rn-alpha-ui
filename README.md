# @scripturecoder/rn-alpha-ui

Reusable React Native UI components extracted from `@scripturecoder/rn-alpha`.  
This package exposes themed building blocks (buttons, inputs, modals, sheets, list primitives, etc.) without the original data layer dependencies.

## Installation

```bash
npm install @scripturecoder/rn-alpha-ui
# or
yarn add @scripturecoder/rn-alpha-ui
```

That installs only the UI library (good when the native dependencies already exist in your app).  
If you haven’t configured the bundled native modules yet, you can install them alongside the library in one go:

```bash
npm install @scripturecoder/rn-alpha-ui @d11/react-native-fast-image@8.9.2 country-code-emoji dayjs react-native-date-picker@5.0.12 react-native-loader-kit react-native-linear-gradient react-native-material-menu react-native-otp-entry react-native-safe-area-context react-native-svg@15.12.0 react-native-keyboard-controller react-native-reanimated
# or
yarn add @scripturecoder/rn-alpha-ui @d11/react-native-fast-image@8.9.2 country-code-emoji dayjs react-native-date-picker@5.0.12 react-native-loader-kit react-native-linear-gradient react-native-material-menu react-native-otp-entry react-native-safe-area-context react-native-svg@15.12.0 react-native-keyboard-controller react-native-reanimated
```


You'll also need the peer dependencies installed in your app (`react`, `react-native`) and should make sure any native modules (`@gorhom/bottom-sheet`, `react-native-svg`, `react-native-linear-gradient`, etc.) are properly configured.

## Usage

Wrap your app with the provided color provider to get access to the built-in light/dark palette:

```tsx
import React from 'react';
import { AlphaUIProvider, Button, Page } from '@scripturecoder/rn-alpha-ui';

const App = () => (
  <AlphaUIProvider initialMode="light">
    <Page>
      <Button title="Tap me" onPress={() => { /* ... */ }} />
    </Page>
  </AlphaUIProvider>
);
```

Every component consumes the `useColor` hook which reads from the `AlphaUIProvider`.  
You can override the palette by passing a `customColors` object to the provider if you need to align with your brand.

### Basic layout and typography

Most primitives mirror the React Native API, so you can compose them exactly as you would in a regular RN screen:

```tsx
import React from 'react';
import { AlphaUIProvider, View, Text, ScrollView, Button } from '@scripturecoder/rn-alpha-ui';

const customColors = {
  light: {
    primary: '#3B82F6',
    background: '#F9FBFF',
    text: '#0F172A',
    text2: '#334155',
  },
  dark: {
    primary: '#60A5FA',
    background: '#0F172A',
    text: '#E2E8F0',
    text2: '#94A3B8',
  },
};

const componentProps = {
  Text: {
    size: 16,
  },
  Button: {
    br: 8,
    pv: 15,
  },
};

const fontFamily = {
  base: 'Inter', // Automatically generates Inter-Regular, Inter-Bold, etc.
};

export const ProfileScreen = () => (
  <AlphaUIProvider 
    initialMode="light" 
    customColors={customColors}
    componentProps={componentProps}
    fontFamily={fontFamily}
  >
    <ScrollView contentContainerStyle={{ padding: 24 }}>
      <View style={{ marginBottom: 16 }}>
        <Text size={26} weight="ExtraBold" color="primary">Welcome back</Text>
        <Text color="text2" weight="Light">
          Tune the palette and component defaults by passing tokens into the provider.
        </Text>
      </View>

      <View gap={12}>
        <View padding={16} br={12} color="background">
          <Text tt="uppercase" weight="Medium" color="text2">Balance</Text>
          <Text size={22} weight="SemiBold" color="text">₦120,000.00</Text>
        </View>

        <Button
          title="Make a transfer"
          onPress={() => { /* navigation */ }}
          color="primary"
        />
      </View>
    </ScrollView>
  </AlphaUIProvider>
);
```

Every layout primitive exposes typed props (`color`, `weight`, `size`, `br`, etc.) so you can reference theme tokens or pass inline values directly.  Pair those with `customColors` and `componentProps` to keep styling consistent across the app.

### Persisting the color mode

`AlphaUIProvider` can run uncontrolled (default) or in a controlled mode.  
Provide the `mode` prop and an `onModeChange` handler to let your app keep the theme in state or storage:

```tsx
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AlphaUIProvider, Page, Button, ColorModes } from '@scripturecoder/rn-alpha-ui';

const App = () => {
  const [mode, setMode] = React.useState<ColorModes>('light');

  React.useEffect(() => {
    AsyncStorage.getItem('theme-mode').then((value) => {
      if (value === 'light' || value === 'dark') {
        setMode(value);
      }
    });
  }, []);

  const handleModeChange = React.useCallback((next: ColorModes) => {
    setMode(next);
    AsyncStorage.setItem('theme-mode', next).catch(() => {});
  }, []);

  return (
    <AlphaUIProvider mode={mode} onModeChange={handleModeChange}>
      <Page>
        <Button title="Toggle theme" onPress={() => handleModeChange(mode === 'light' ? 'dark' : 'light')} />
      </Page>
    </AlphaUIProvider>
  );
};
```

Any component that calls `setColorMode` from the context now triggers your handler, so the consuming app can persist the choice however it prefers.

### Font Family Configuration

Configure your app's font family globally through the `fontFamily` prop:

**Simple base font configuration** - Just provide the base font name and the system will automatically generate weight variants:

```tsx
<AlphaUIProvider fontFamily={{ base: 'Inter' }}>
  <Text weight="Bold">Uses Inter-Bold</Text>
  <Text weight="Regular">Uses Inter-Regular</Text>
  <Text weight="Light">Uses Inter-Light</Text>
</AlphaUIProvider>
```

**Full explicit configuration** - Specify each font weight individually:

```tsx
<AlphaUIProvider
  fontFamily={{
    regular: 'Inter-Regular',
    bold: 'Inter-Bold',
    semiBold: 'Inter-SemiBold',
    light: 'Inter-Light',
    medium: 'Inter-Medium',
    extraLight: 'Inter-ExtraLight',
    italic: 'Inter-Italic',
    extraBold: 'Inter-ExtraBold',
  }}
>
  {children}
</AlphaUIProvider>
```

**Mixed configuration** - Use base font with specific overrides:

```tsx
<AlphaUIProvider 
  fontFamily={{
    base: 'Inter', // Generates Inter-Regular, Inter-Light, etc.
    bold: 'Inter-Heavy', // Override just the bold weight
    italic: 'Inter-Italic-Special', // Override italic with custom name
  }}
>
  <Text weight="Bold">Uses Inter-Heavy</Text>
  <Text weight="Regular">Uses Inter-Regular</Text>
  <Text weight="Italic">Uses Inter-Italic-Special</Text>
</AlphaUIProvider>
```

**Custom font family** - Use a completely custom font:

```tsx
<AlphaUIProvider 
  fontFamily={{
    base: 'Inter', // Generates Inter-Regular, Inter-Light, etc.
    custom: 'Inter-Custom', // Custom font for special cases
  }}
>
  <Text weight="Regular">Uses Inter-Regular</Text>
  <Text weight="Custom">Uses Inter-Custom</Text>
</AlphaUIProvider>
```

### Component-wide defaults

Pass `componentProps` to define default props for any component:

```tsx
<AlphaUIProvider
  componentProps={{
    Text: {
      size: 16,
      color: 'text',
      allowFontScaling: false,
    },
    Button: {
      br: 8,
      pv: 15,
      weight: 'Bold',
    },
    View: {
      br: 4,
    },
  }}
>
  {children}
</AlphaUIProvider>
```

All component instances will use these defaults as their starting point, but you can still override any prop locally:

```tsx
// Uses defaults: size: 16, color: 'text'
<Text>Hello</Text>

// Overrides: size: 20, color: 'primary'
<Text size={20} color="primary">Hello</Text>
```

This system works for all components in the library and provides a clean way to maintain consistent styling across your app.

### Adaptive Font Sizing

The `Text` component supports adaptive font sizing that automatically scales based on screen dimensions. This ensures consistent text readability across different device sizes.

**Basic adaptive sizing:**

```tsx
// Text automatically scales based on screen width
<Text adaptiveSize size={16}>
  This text scales with screen size
</Text>
```

**Custom reference width:**

```tsx
// Use a different reference width for scaling
<Text adaptiveSize size={18} referenceWidth={320}>
  Scaled for iPhone SE (320px reference)
</Text>
```

**With size constraints:**

```tsx
// Set minimum and maximum font sizes
<Text 
  adaptiveSize 
  size={20} 
  minSize={14} 
  maxSize={28}
>
  Constrained adaptive sizing
</Text>
```

**Combined with other features:**

```tsx
<Text 
  adaptiveSize 
  size={16} 
  weight="Bold" 
  color="primary"
  adjustsFontSizeToFit
>
  Adaptive text with other features
</Text>
```

**How it works:**
- Uses a reference screen width (default: 375px - iPhone 11 width)
- Calculates scale factor: `currentWidth / referenceWidth`
- Applies PixelRatio for pixel-perfect rendering
- Includes device-specific adjustments (95% for small devices, 105% for large devices)
- Clamps values between `minSize` and `maxSize` props

**Props:**
- `adaptiveSize?: boolean` - Enable/disable adaptive sizing
- `referenceWidth?: number` - Reference width for scaling (default: 375)
- `minSize?: number` - Minimum font size (default: 12)
- `maxSize?: number` - Maximum font size (default: 32)

### LinearGradient Component

The `LinearGradient` component provides a flexible way to create gradient backgrounds with support for multiple directions and custom colors:

```tsx
import { LinearGradient, Text } from '@scripturecoder/rn-alpha-ui';

// Basic usage with theme colors
<LinearGradient>
  <Text>Hello World</Text>
</LinearGradient>

// Custom colors and direction
<LinearGradient 
  colors={['#FF6B6B', '#4ECDC4']} 
  direction="diagonal-down"
  br={20}
  pv={20}
>
  <Text>Custom Gradient</Text>
</LinearGradient>

// With layout props
<LinearGradient 
  width="100%" 
  height={200}
  direction="to-right"
  mv={10}
  ph={20}
>
  <Text>Full width gradient</Text>
</LinearGradient>

// Using shortened props (w, h, p, m, size)
<LinearGradient 
  w="100%" 
  h={200}
  direction="to-right"
  m={10}
  p={20}
>
  <Text>Shortened props</Text>
</LinearGradient>

// Using size for both width and height
<LinearGradient 
  size={100}
  direction="diagonal-down"
  br={50}
>
  <Text>Square gradient</Text>
</LinearGradient>

// Custom start/end points
<LinearGradient 
  colors={['primary', 'secondary']}
  start={{x: 0, y: 0}}
  end={{x: 1, y: 1}}
  locations={[0, 0.5, 1]}
>
  <Text>Custom gradient</Text>
</LinearGradient>
```

**Available directions:**
- `to-right` (default)
- `to-left`
- `to-top`
- `to-bottom`
- `to-top-right`
- `to-top-left`
- `to-bottom-right`
- `to-bottom-left`
- `diagonal-up`
- `diagonal-down`

**Props:**
- `colors` - Array of colors (supports theme colors like 'primary', 'secondary')
- `direction` - Predefined gradient direction
- `start` / `end` - Custom start and end points for precise control
- `locations` - Array of numbers (0-1) to control color stops
- `radius` / `borderRadius` - Border radius styling
- **Layout props:** `width`/`w`, `height`/`h`, `size` (sets both width and height), `flex`
- **Padding props:** `padding`/`p`, `pv`, `ph`, `pt`, `pb`, `pl`, `pr`
- **Margin props:** `margin`/`m`, `mv`, `mh`, `mt`, `mb`, `ml`, `mr`

## Component Examples

### Layout Components

**View with styling props:**
```tsx
import { View, Text } from '@scripturecoder/rn-alpha-ui';

<View 
  flex={1} 
  padding={20} 
  br={12} 
  color="background"
  center
>
  <Text>Centered content</Text>
</View>
```

**ScrollView with content padding:**
```tsx
import { ScrollView, View, Text } from '@scripturecoder/rn-alpha-ui';

<ScrollView 
  contentPadding={20}
  contentPaddingHorizontal={16}
  contentPaddingVertical={24}
>
  <View>
    <Text>Scrollable content</Text>
  </View>
</ScrollView>
```

**SafeAreaView with custom edges:**
```tsx
import { SafeAreaView, Text } from '@scripturecoder/rn-alpha-ui';

<SafeAreaView 
  edges={['top', 'left', 'right']}
  color="background"
>
  <Text>Safe area content</Text>
</SafeAreaView>
```

### Input Components

**Basic Input:**
```tsx
import { Input, View } from '@scripturecoder/rn-alpha-ui';

const [value, setValue] = useState('');

<Input
  label="Email"
  placeholder="Enter your email"
  value={value}
  onChangeText={setValue}
  keyboardType="email-address"
  autoCapitalize="none"
/>
```

**Password Input:**
```tsx
import { Password } from '@scripturecoder/rn-alpha-ui';

<Password
  label="Password"
  placeholder="Enter password"
  value={password}
  onChangeText={setPassword}
/>
```

**Select Dropdown:**
```tsx
import { Select } from '@scripturecoder/rn-alpha-ui';

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

<Select
  label="Choose option"
  options={options}
  onChange={(data) => console.log(data)}
  search
/>
```

**Date/Time Input:**
```tsx
import { DateSelect, DateTimeInput } from '@scripturecoder/rn-alpha-ui';

// Date only
<DateSelect
  label="Birth Date"
  value={date}
  onChangeText={setDate}
  minimumDate={new Date('1900-01-01')}
/>

// Date and time
<DateTimeInput
  label="Appointment"
  value={dateTime}
  onChangeText={setDateTime}
  mode="date" // or "time"
/>
```

**Search Input:**
```tsx
import { SearchInput } from '@scripturecoder/rn-alpha-ui';

<SearchInput
  filter={searchTerm}
  setFilter={setSearchTerm}
  placeholder="Search..."
  onSubmit={(value) => console.log('Search:', value)}
/>
```

**OTP Input:**
```tsx
import { OtpInput } from '@scripturecoder/rn-alpha-ui';

<OtpInput
  length={6}
  onComplete={(otp) => console.log('OTP:', otp)}
/>
```

### Button Components

**Basic Button:**
```tsx
import { Button } from '@scripturecoder/rn-alpha-ui';

<Button
  title="Click me"
  onPress={() => console.log('Pressed')}
  color="primary"
  size={16}
  weight="Bold"
/>
```

**Button with icon:**
```tsx
<Button
  title="Save"
  icon="save"
  iconSize={20}
  onPress={handleSave}
  loading={isLoading}
/>
```

**Icon Button:**
```tsx
import { IconBtn } from '@scripturecoder/rn-alpha-ui';

<IconBtn
  icon="heart"
  size={24}
  color="danger"
  onPress={handleLike}
/>
```

**FAB Button:**
```tsx
import { FabButton } from '@scripturecoder/rn-alpha-ui';

<FabButton
  icon="plus"
  onPress={handleAdd}
  color="primary"
/>
```

### Modal Components

**Alert Modal:**
```tsx
import { AlertModal } from '@scripturecoder/rn-alpha-ui';

<AlertModal
  modal={showAlert}
  setModal={setShowAlert}
  title="Confirm Action"
  text="Are you sure you want to continue?"
  color="warning"
  confirm="Yes"
  cancel="No"
  onConfirm={handleConfirm}
  onCancel={handleCancel}
/>
```

**Option Modal:**
```tsx
import { OptionModal } from '@scripturecoder/rn-alpha-ui';

const options = [
  { label: 'Edit', icon: 'edit', onPress: handleEdit },
  { label: 'Delete', icon: 'delete', color: 'danger', onPress: handleDelete },
  { label: 'Share', icon: 'share', onPress: handleShare },
];

<OptionModal
  modal={showOptions}
  setModal={setShowOptions}
  options={options}
/>
```

**Custom Modal:**
```tsx
import { Modal } from '@scripturecoder/rn-alpha-ui';

<Modal
  modal={showModal}
  setModal={setShowModal}
  full
  enableSwipeToClose
>
  <View padding={20}>
    <Text>Custom modal content</Text>
  </View>
</Modal>
```

### List Components

**FlatList with custom styling:**
```tsx
import { FlatList, View, Text } from '@scripturecoder/rn-alpha-ui';

<FlatList
  data={items}
  renderItem={({ item }) => (
    <View padding={16} br={8} color="background">
      <Text>{item.title}</Text>
    </View>
  )}
  keyExtractor={(item) => item.id}
  contentPadding={16}
  refreshColor="primary"
/>
```

### Form Components

**Checkbox:**
```tsx
import { Checkbox, View, Text } from '@scripturecoder/rn-alpha-ui';

<View flexDirection="row" alignItems="center">
  <Checkbox
    selected={isChecked}
    setSelected={setIsChecked}
    color="primary"
  />
  <Text marginLeft={8}>I agree to terms</Text>
</View>
```

**Switch:**
```tsx
import { Switch } from '@scripturecoder/rn-alpha-ui';

<Switch
  active={isEnabled}
  onToggle={setIsEnabled}
  disabled={false}
/>
```

### Utility Components

**Loader:**
```tsx
import { Loader } from '@scripturecoder/rn-alpha-ui';

<Loader
  loading={isLoading}
  text="Loading..."
  color="primary"
/>
```

**Progress Bar:**
```tsx
import { ProgressBar } from '@scripturecoder/rn-alpha-ui';

<ProgressBar
  progress={0.7}
  color="primary"
  background="light"
  height={8}
  radius={4}
/>
```

**Empty State:**
```tsx
import { EmptyState } from '@scripturecoder/rn-alpha-ui';

<EmptyState
  title="No items found"
  text="Try adjusting your search criteria"
  icon="search"
/>
```

**Error View:**
```tsx
import { ErrorView } from '@scripturecoder/rn-alpha-ui';

<ErrorView
  error="Something went wrong"
  onRetry={handleRetry}
/>
```

### Advanced Usage

**Custom Page with status bar:**
```tsx
import { Page, View, Text } from '@scripturecoder/rn-alpha-ui';

<Page
  statusBarStyle="light-content"
  statusBarColor="primary"
  edgeToEdge
  safeAreaMode="auto"
>
  <View flex={1} padding={20}>
    <Text>Page content</Text>
  </View>
</Page>
```

**Keyboard avoiding view:**
```tsx
import { KeyboardView, View, Input } from '@scripturecoder/rn-alpha-ui';

<KeyboardView behavior="padding">
  <View flex={1} padding={20}>
    <Input label="Name" />
    <Input label="Email" />
  </View>
</KeyboardView>
```

**Menu component:**
```tsx
import { Menu, Button } from '@scripturecoder/rn-alpha-ui';

<Menu
  anchor={<Button title="Menu" />}
  options={[
    { label: 'Option 1', onPress: handleOption1 },
    { label: 'Option 2', onPress: handleOption2 },
  ]}
  color="primary"
/>
```

### Icons Usage

The package includes a comprehensive set of SVG icons that can be imported and used in your components:

**Importing individual icons:**
```tsx
import { 
  check, 
  arrowLeft, 
  arrowRight, 
  contact, 
  calender, 
  notification,
  cancel,
  // ... and many more
} from '@scripturecoder/rn-alpha-ui';

const MyComponent = () => (
  <View>
    <Text>Icons are available as SVG strings</Text>
    {/* Use with Svg component */}
    <Svg icon={check} size={24} color="success" />
    <Svg icon={arrowLeft} size={20} color="primary" />
  </View>
);
```

**Using icons with the Svg component:**
```tsx
import { Svg, check, arrowLeft, contact } from '@scripturecoder/rn-alpha-ui';

// Basic usage
<Svg icon={check} size={24} color="success" />

// With custom styling
<Svg 
  icon={arrowLeft} 
  size={20} 
  color="primary"
  w={30}
  h={30}
/>

// In buttons
<Button 
  title="Back" 
  icon={arrowLeft}
  onPress={handleBack}
/>
```

**Available icons include:**
- Navigation: `arrowLeft`, `arrowRight`, `selectToggle`
- Actions: `check`, `cancel`, `contact`
- UI Elements: `calender`, `notification`
- And many more...

**Using icons in custom components:**
```tsx
import { check, arrowLeft } from '@scripturecoder/rn-alpha-ui';

const CustomIcon = ({ name, size = 24, color = 'currentColor' }) => {
  const iconMap = {
    check,
    arrowLeft,
    // Add more as needed
  };
  
  const iconSvg = iconMap[name];
  
  if (!iconSvg) return null;
  
  return (
    <Svg 
      icon={iconSvg} 
      size={size} 
      color={color}
    />
  );
};
```

### Hooks Usage

**useColor hook:**
```tsx
import { useColor } from '@scripturecoder/rn-alpha-ui';

const MyComponent = () => {
  const { colors, colorMode, setColorMode } = useColor();
  
  return (
    <View color={colors.primary}>
      <Text>Current mode: {colorMode}</Text>
    </View>
  );
};
```

**useDimensions hook:**
```tsx
import { useDimensions } from '@scripturecoder/rn-alpha-ui';

const MyComponent = () => {
  const { width, height, isBigDevice } = useDimensions();
  
  return (
    <Text>
      Screen: {width}x{height} - {isBigDevice ? 'Big' : 'Small'} device
    </Text>
  );
};
```

**usePageConfig hook:**
```tsx
import { usePageConfig } from '@scripturecoder/rn-alpha-ui';

const MyComponent = () => {
  const { insets, colors, isEdgeToEdge } = usePageConfig({
    edgeToEdge: true,
    statusBarColor: 'primary'
  });
  
  return (
    <View paddingTop={insets.top}>
      <Text>Content with safe area</Text>
    </View>
  );
};
```

## Building

```bash
npm run build
```

The compiled output is emitted to `dist/` and includes CommonJS, ESModule and type definition bundles generated via `tsup`.
