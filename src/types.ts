export type ModalProps = {
  modal: boolean;
  setModal: (value: boolean) => void;
};

export type ColorModes = 'light' | 'dark';

export type Weight =
  | 'Regular'
  | 'Bold'
  | 'SemiBold'
  | 'Light'
  | 'Medium'
  | 'ExtraLight'
  | 'Italic'
  | 'ExtraBold'
  | 'Custom';

export type PartialDeep<T> = {
  [K in keyof T]?: T[K] extends Record<string, any> ? PartialDeep<T[K]> : T[K];
};
