import { ios } from "constants/layout.ts";

export type InputDesignTokens = {
  control: {
    radius: number;
    borderWidth: number;
    backgroundColorToken: string;
    disabledOpacity: number;
    gap: number;
  };
  label: {
    size: number;
    weight: string;
    spacingBottom: number;
  };
  helper: {
    size: number;
    spacingTop: number;
    spacingLeft: number;
  };
  textField: {
    paddingHorizontal: number;
    paddingVertical: number;
    height?: number;
    iconSpacing: number;
    showMoneyIcon: boolean;
  };
  password: {
    toggleSize: number;
    toggleColor: string;
  };
  select: {
    paddingHorizontal: number;
    paddingVertical: number;
    height: number;
    iconWrapperSize: number;
    iconWrapperRadius: number;
    loaderSize: number;
    dropdownIconSize: number;
    modalPadding: number;
    optionGap: number;
    optionPaddingVertical: number;
  };
  datePicker: {
    paddingHorizontal: number;
    paddingVertical: number;
    iconSize: number;
    dateFormat: string;
    timeFormat: string;
  };
  searchField: {
    radius: number;
    borderWidth: number;
    paddingHorizontal: number;
    paddingVertical: number;
    textGap: number;
    iconSize: number;
    clearSize: number;
  };
  filterSearch: {
    radius: number;
    fieldPaddingLeft: number;
    buttonPaddingHorizontal: number;
    buttonPaddingVertical: number;
    iconSize: number;
  };
  phoneNumber: {
    height: number;
    selectHeight: number;
    inputHeight: number;
    dialCodeFontSize: number;
    dialCodePaddingHorizontal: number;
    gap: number;
    maxLength: number;
  };
  checkbox: {
    size: number;
    borderWidth: number;
    circularRadius: number;
    squareRadius: number;
    innerSize: number;
  };
  otp: {
    width: number;
    height: number;
    borderWidth: number;
    borderRadius: number;
    fontSize: number;
    gap: number;
  };
};

const basePaddingHorizontal = 16;
const basePaddingVertical = ios ? 16 : 14;

const inputConfig: InputDesignTokens = {
  control: {
    radius: 10,
    borderWidth: 1,
    backgroundColorToken: "background",
    disabledOpacity: 0.55,
    gap: 10,
  },
  label: {
    size: 14,
    weight: "SemiBold",
    spacingBottom: 6,
  },
  helper: {
    size: 11,
    spacingTop: 6,
    spacingLeft: 0,
  },
  textField: {
    paddingHorizontal: basePaddingHorizontal,
    paddingVertical: ios ? 18 : 14,
    height: undefined,
    iconSpacing: 14,
    showMoneyIcon: true,
  },
  password: {
    toggleSize: 20,
    toggleColor: "#949494",
  },
  select: {
    paddingHorizontal: basePaddingHorizontal,
    paddingVertical: basePaddingVertical,
    height: 56,
    iconWrapperSize: 32,
    iconWrapperRadius: 50,
    loaderSize: 18,
    dropdownIconSize: 10,
    modalPadding: 24,
    optionGap: 15,
    optionPaddingVertical: 15,
  },
  datePicker: {
    paddingHorizontal: basePaddingHorizontal,
    paddingVertical: basePaddingVertical,
    iconSize: 20,
    dateFormat: "MMM D, YYYY",
    timeFormat: "h:mm A",
  },
  searchField: {
    radius: 10,
    borderWidth: 0.5,
    paddingHorizontal: basePaddingHorizontal,
    paddingVertical: ios ? 15 : 10,
    textGap: 10,
    iconSize: 20,
    clearSize: 22,
  },
  filterSearch: {
    radius: 50,
    fieldPaddingLeft: 10,
    buttonPaddingHorizontal: 15,
    buttonPaddingVertical: 13,
    iconSize: 25,
  },
  phoneNumber: {
    height: 60,
    selectHeight: 58,
    inputHeight: 58,
    dialCodeFontSize: 32,
    dialCodePaddingHorizontal: 15,
    gap: 6,
    maxLength: 11,
  },
  checkbox: {
    size: 22,
    borderWidth: 2,
    circularRadius: 50,
    squareRadius: 4,
    innerSize: 12,
  },
  otp: {
    width: 63,
    height: 69,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 32,
    gap: 12,
  },
};

export default inputConfig;
