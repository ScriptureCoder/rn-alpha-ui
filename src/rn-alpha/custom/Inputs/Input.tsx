import React, { useState } from 'react';
import {KeyboardTypeOptions, TextInput, ViewStyle} from "react-native";
import separator from "../../../utils/money";
import {naira} from "../../../config";
import Label from "./Label";
import ErrorText from "./ErrorText";
import inputConfig from "./InputConfig";
import { Text, View } from "../..";
import useColor from "hooks/use-color.ts";
import {ios} from "constants/layout.ts";
import {ColorProps} from "constants/colors";
import { useUIContext } from '../../../theme/alpha-ui-context';

export type InputProps = {
    placeholder?:string
    label:string
    onChangeText:(value:any)=>void
    value?:any
    style?:ViewStyle
    error?:any
    autoCapitalize?:'none'|'sentences'|'words'
    keyboardType?:KeyboardTypeOptions
    money?:boolean
    editable?:boolean
    maxLength?:number
    height?:number
    h?:number
    mt?:number
    multiline?:boolean
    bw?:number
    ph?:number
    onBlur?:()=>void
    onFocus?:()=>void
    onSubmitEditing?:()=>void
    autoFocus?:boolean
}

const Input: React.FC<InputProps> = (props) => {
    const [focus,setFocus] = useState(false);
    const {colors} = useColor();
    const { componentProps } = useUIContext();
    const inputDefaults = componentProps.Input || {};

    const mergedProps = {
        ...inputDefaults,
        ...props,
    };

    const {
        placeholder,
        onBlur,
        onFocus,
        mt,
        bw,
        multiline,
        height,
        h,
        editable,
        maxLength,
        money,
        keyboardType,
        autoCapitalize,
        error,
        onChangeText,
        value,
        style,
        label,
        ph,
        autoFocus,
        onSubmitEditing
    } = mergedProps

    const bc = error?colors.danger:focus?colors.primary:colors.border
    const { control, textField } = inputConfig;

    return (
        <View mt={mt} style={style}>
            {label&&(
                <Label label={label} focus={focus} value={value} error={!!error}/>
            )}
            <View
                br={control.radius}
                fd={"flex-row"}
                color={colors[control.backgroundColorToken as ColorProps] || colors.background}
                bw={bw||control.borderWidth}
                bc={bc}
            >
                {money&&textField.showMoneyIcon&&(
                    <View fd={"flex-center"} pl={textField.iconSpacing}>
                        <Text size={16} color={"text2"} mb={ios?0:-2.5}>{naira}</Text>
                    </View>
                )}
                <TextInput
                    returnKeyType={(keyboardType==='number-pad'||money)?'done':undefined}
                    style={{
                        flex:1,
                        paddingHorizontal:money?5:ph||textField.paddingHorizontal,
                        paddingVertical:textField.paddingVertical,
                        height:height||h||textField.height,
                        color:colors.text
                    }}
                    maxLength={maxLength}
                    multiline={multiline}
                    placeholder={focus?"":placeholder}
                    keyboardType={money?"number-pad":keyboardType}
                    placeholderTextColor={colors.placeholder}
                    autoCapitalize={autoCapitalize}
                    value={money?value?separator(Number(value),2):null:value}
                    onChangeText={(text)=>{
                        if (money){
                            onChangeText(Number(text.replace(/[,.]/g,''))/100);
                        }else {
                            onChangeText(text)
                        }
                    }}
                    editable={editable}
                    onBlur={()=>{
                        onBlur?.()
                        setFocus(false)
                    }}
                    onFocus={()=>{
                        onFocus?.()
                        setFocus(true)
                    }}
                    autoFocus={autoFocus}
                    onSubmitEditing={onSubmitEditing}
                />
            </View>
            {error&&(
                <ErrorText error={error}/>
            )}
        </View>
    );
};

export default Input;
