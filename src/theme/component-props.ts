export type ComponentProps = {
  Text?: Record<string, any>;
  Button?: Record<string, any>;
  View?: Record<string, any>;
  Input?: Record<string, any>;
  ScrollView?: Record<string, any>;
  FlatList?: Record<string, any>;
  TouchableOpacity?: Record<string, any>;
  TouchableHighlight?: Record<string, any>;
  TouchableNativeFeedback?: Record<string, any>;
  Image?: Record<string, any>;
  ImageBackground?: Record<string, any>;
  KeyboardView?: Record<string, any>;
  SafeAreaView?: Record<string, any>;
  AlertModal?: Record<string, any>;
  OptionModal?: Record<string, any>;
  Page?: Record<string, any>;
  Modal?: Record<string, any>;
  Svg?: Record<string, any>;
  Switch?: Record<string, any>;
  Select?: Record<string, any>;
  SearchInput?: Record<string, any>;
  DateSelect?: Record<string, any>;
  DateTimeInput?: Record<string, any>;
  Checkbox?: Record<string, any>;
  Password?: Record<string, any>;
  Label?: Record<string, any>;
  ErrorText?: Record<string, any>;
  Loader?: Record<string, any>;
  Preloader?: Record<string, any>;
  ProgressBar?: Record<string, any>;
  IconButton?: Record<string, any>;
  TextInput?: Record<string, any>;
  Menu?: Record<string, any>;
  LinearGradient?: Record<string, any>;
  [component: string]: Record<string, any> | undefined;
};

export const defaultComponentProps: ComponentProps = {};

let currentProps: ComponentProps = { ...defaultComponentProps };

export const mergeComponentProps = (
  base: ComponentProps,
  overrides: ComponentProps,
): ComponentProps => {
  const result: ComponentProps = { ...base };

  Object.entries(overrides).forEach(([key, value]) => {
    if (!value) {
      return;
    }

    result[key] = {
      ...(result[key] ?? {}),
      ...value,
    };
  });

  return result;
};

export const configureComponentProps = (overrides: ComponentProps) => {
  currentProps = mergeComponentProps(currentProps, overrides);
};

export const getAllComponentProps = (): ComponentProps => currentProps;

export const getComponentProps = <K extends keyof ComponentProps>(
  component: K,
): ComponentProps[K] => {
  return currentProps[component];
};

export const resetComponentProps = () => {
  currentProps = { ...defaultComponentProps };
};

export const buildComponentProps = (
  overrides: ComponentProps | undefined,
): ComponentProps => {
  if (!overrides) {
    return { ...defaultComponentProps };
  }
  return mergeComponentProps({ ...defaultComponentProps }, overrides);
};
