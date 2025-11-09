import React, {useEffect, useState} from 'react';
import {ios} from "../../../constants/layout.ts";
import {Keyboard, TouchableWithoutFeedback, useColorScheme, ViewStyle} from "react-native";
import DatePicker from "react-native-date-picker";
import {calender, clock} from "../../../assets/icons/index.ts";
import inputConfig from "./InputConfig";
import {ErrorText, Text, View, Label, Svg, dayjs} from '../../index.ts';
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
    mode?:'date'|'time'
    disabled?:boolean
}

const DateTimeInput: React.FC<DateSelectProps> = (props) => {
    const {disabled, placeholder, mode="date", bw, mt, label, error, onChangeText, value, style, minimumDate } = props;
    const [open, setOpen] = useState(false)
    const [date,setDate] = useState<Date>();
    const [edited,setEdited] = useState(false);
    const isDarkMode = useColorScheme() === 'dark';
    const {colors} = useColor();
    const textColor = isDarkMode?colors.light:colors.dark;
    const { control, datePicker } = inputConfig;
    const backgroundColor = colors[control.backgroundColorToken as ColorProps] || colors.background;

    useEffect(()=>{
        if (value){
            setDate(value)
            setEdited(true)
        }
    },[value]);

    const onConfirm=(date:Date)=>{
        setOpen(false)
        setDate(date)
        setEdited(true)
        onChangeText(date)
    }

    const onOpen=()=>{
        Keyboard.dismiss()
        setTimeout(()=>{
            setOpen(true)
        },40)
    }

    return (
        <View mt={mt} style={style}>
            {label&&(
                <Label label={label} focus={open} value={edited} error={!!error}/>
            )}
            <TouchableWithoutFeedback
                onPress={onOpen}
                disabled={disabled}
            >
                <View
                    br={control.radius}
                    fd={"flex-center"}
                    color={backgroundColor}
                    bw={bw||control.borderWidth}
                    bc={colors.border}
                    ph={datePicker.paddingHorizontal}
                    pv={datePicker.paddingVertical}
                    gap={control.gap}
                >
                    <View flex={1}>
                        <Text style={{color:edited?colors.text:colors.placeholder}}>
                            {edited? dayjs(date).format(mode==="time"?datePicker.timeFormat:datePicker.dateFormat) :placeholder}
                        </Text>
                    </View>
                    <View width={24}>
                        <Svg icon={mode==="time"?clock:calender} color={"medium"}/>
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
                date={date||new Date()}
                mode={mode}
                minimumDate={minimumDate}
                onConfirm={onConfirm}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </View>
    );
};

export default DateTimeInput;
