import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

export { default as View } from './default/View';
export { default as SafeAreaView } from './custom/SafeAreaView';
export { default as Text } from './default/Text';
export { default as ScrollView } from './default/ScrollView';
export { default as FlatList } from './default/FlatList';
export { default as TouchableHighlight } from './default/TouchableHighlight';
export { default as TouchableNativeFeedback } from './default/TouchableNativeFeedback';
export { default as TouchableOpacity } from './default/TouchableOpacity';
export { default as Image } from './default/Image';
export { default as KeyboardView } from './default/KeyboardView';
export { default as ImageBackground } from './default/ImageBackground';
export { default as AlertModal } from './custom/AlertModal';
export { default as OptionModal } from './custom/OptionModal';
export { default as Page } from './custom/Page';
export { default as Modal } from './custom/Modal';
export { default as Button } from './custom/Button';
export { default as Svg } from './custom/Svg';
export { default as Input } from './custom/Inputs/Input';
export { default as NumPadKeyboard } from './custom/Inputs/NumPadKeyboard';
export { default as Switch } from './custom/Inputs/Switch';
export { default as Select } from './custom/Inputs/Select';
export { default as SearchInput } from './custom/Inputs/SearchInput';
export { default as DateSelect } from './custom/Inputs/DateSelect';
export { default as DateTimeInput } from './custom/Inputs/DateTimeInput';
export { default as Checkbox } from './custom/Inputs/Checkbox';
export { default as Password } from './custom/Inputs/Password';
export { default as Label } from './custom/Inputs/Label';
export { default as ErrorText } from './custom/Inputs/ErrorText';
export { default as Loader } from './custom/Loader';
export { default as Preloader } from './custom/Preloader';
export { default as ProgressBar } from './custom/ProgressBar';
export { default as IconButton } from './custom/IconBtn';
export { default as TextInput } from './custom/Inputs/TextInput';
export { default as OtpInput } from './custom/Inputs/OtpInput';
export { default as Menu } from './custom/Menu';
export { default as LinearGradient } from './custom/Gradient';
export { default as TabButton } from './custom/TabButton';
export { default as LoadingDots } from './custom/LoadingDots';
export { default as ErrorView } from './custom/ErrorView';
export { default as EmptyState } from './custom/EmptyState';
export { default as FabButton } from './custom/FabButton';

export { default as useColor } from 'hooks/use-color.ts';
export { default as useDimensions } from 'hooks/use-dimensions.ts';
export { usePageConfig } from 'hooks/use-page-config.ts';
export {
  AlphaUIProvider,
  UIProvider,
  ColorProvider,
  useAlphaUIContext,
  useUIContext,
  useColorContext,
} from '../theme/alpha-ui-context';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export { dayjs };

export const KEY = Math.random().toString(36).substring(2, 20);
