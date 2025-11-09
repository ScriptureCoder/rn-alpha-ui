declare module 'react-native-date-picker' {
  import type { Component } from 'react';
  import type { ViewProps } from 'react-native';

  export type DatePickerMode = 'date' | 'time' | 'datetime';

  export interface DatePickerProps extends ViewProps {
    date: Date;
    mode?: DatePickerMode;
    minimumDate?: Date;
    maximumDate?: Date;
    locale?: string;
    timeZoneOffsetInMinutes?: number;
    onConfirm?: (date: Date) => void;
    onCancel?: () => void;
    open?: boolean;
    modal?: boolean;
    textColor?: string;
    title?: string;
    androidVariant?: 'iosClone' | 'nativeAndroid';
    [key: string]: any;
  }

  export default class DatePicker extends Component<DatePickerProps> {}
}
