import React, { useState } from 'react';
import {ios} from "../../../constants/layout.ts";
import {TouchableWithoutFeedback, useColorScheme, ViewStyle} from "react-native";
import DatePicker from "react-native-date-picker";
import { calender } from "../../../assets/icons/index.ts";
import inputConfig from "./InputConfig";
import { ErrorText, Text, View, Label, Svg, dayjs } from '../../index.ts';
import useColor from "hooks/use-color.ts";
import {ColorProps} from "constants/colors";

export type DateSelectProps = {
    placeholder?:string
    onChangeText:(value:any)=>void
    value?:Date
    minimumDate?:Date
    style?:ViewStyle
    label?:string
    error?:string
    mt?:number
    bw?:number
}

const DateSelect: React.FC<DateSelectProps> = ({placeholder,bw,mt,label,error,onChangeText,value,style,minimumDate}) => {
    const [open, setOpen] = useState(false)
    const [date,setDate] = useState<Date>(value || new Date());
    const [edited,setEdited] = useState(!!value);
    const isDarkMode = useColorScheme() === 'dark';
    const {colors} = useColor();
    const textColor = isDarkMode?colors.background:colors.text;
    const { control, datePicker } = inputConfig;
    const backgroundColor = colors[control.backgroundColorToken as ColorProps] || colors.background;

    const onConfirm=(date:Date)=>{
        setOpen(false)
        setDate(date)
        setEdited(true)
        onChangeText(date)
    }

    const onOpen=()=>{
        setOpen(true)
    }

    return (
        <View mt={mt} style={style}>
            {label&&(
                <Label label={label}/>
            )}
            <TouchableWithoutFeedback onPress={onOpen}>
                <View
                    br={control.radius}
                    fd={"flex-center"}
                    color={backgroundColor}
                    bw={bw||control.borderWidth}
                    bc={colors.border}
                    ph={datePicker.paddingHorizontal}
                    pv={datePicker.paddingVertical}
                >
                    <View flex={1}>
                        <Text style={{color:edited?colors.text:colors.placeholder}}>
                            {edited?dayjs(date).format(datePicker.dateFormat):placeholder}
                        </Text>
                    </View>
                    <View width={24}>
                        <Svg icon={calender} color={"medium"}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            {error&&(
                <ErrorText error={error}/>
            )}

            <DatePicker
                modal
                textColor={ios?textColor:undefined}
                title={placeholder}
                open={open}
                date={date}
                mode={"date"}
                minimumDate={minimumDate}
                onConfirm={onConfirm}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </View>
    );
};

export default DateSelect;
