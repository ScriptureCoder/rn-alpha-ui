import React, {forwardRef, useState} from 'react';
import {KeyboardTypeOptions, TextInput, TextInputProps, ViewStyle} from "react-native";
import IconBtn from "../IconBtn";
import inputConfig from "./InputConfig";
import { ErrorText, Label, View } from "../..";
import useColor from "hooks/use-color.ts";
import { eye, eyeOff } from "assets/icons";
import {ColorProps} from "constants/colors";

export type PasswordProps = {
    placeholder?:string
    label?:string
    onChangeText:(value:any)=>void
    value?:any
    style?:ViewStyle
    error?:string|any
    keyboardType?:KeyboardTypeOptions
    mt?:number
    bw?:number
    onSubmitEditing?:()=>void
    ref?:React.ForwardedRef<TextInput>
    maxLength?:number
}

const Password: React.FC<PasswordProps> = forwardRef((props, ref:React.ForwardedRef<TextInput>)=>{
    const {
        placeholder,
        mt,
        bw,
        keyboardType,
        error,
        onChangeText,
        value,
        style,
        label,
        onSubmitEditing,
        maxLength
    } = props;

    const [focus,setFocus] = useState(false);
    const [show,setShow] = useState(false);
    const {colors} = useColor();
    const bc = error?colors.danger:focus?colors.primary:colors.border
    const { control, textField, password } = inputConfig;
    const backgroundColor = colors[control.backgroundColorToken as ColorProps] || colors.background;

    return (
        <View mt={mt} style={style}>
            {label&&(
                <Label label={label} focus={focus} value={value} error={!!error}/>
            )}
            <View
                br={control.radius}
                fd={"flex-center"}
                color={backgroundColor}
                bw={bw||control.borderWidth}
                bc={bc}
                pl={textField.paddingHorizontal}
            >
                <TextInput
                    ref={ref}
                    returnKeyType={keyboardType==='number-pad'?'done':undefined}
                    style={{
                        flex:1,
                        paddingVertical:textField.paddingVertical,
                        color:colors.text
                    }}
                    placeholder={focus?"":placeholder}
                    secureTextEntry={!show}
                    placeholderTextColor={colors.placeholder}
                    onChangeText={onChangeText}
                    value={value}
                    keyboardType={keyboardType}
                    onBlur={()=>{
                        setFocus(false)
                    }}
                    onFocus={()=>{
                        setFocus(true)
                    }}
                    onSubmitEditing={onSubmitEditing}
                    maxLength={maxLength}
                />
                <IconBtn
                    icon={show?eye:eyeOff}
                    color={password.toggleColor}
                    onPress={()=>setShow(!show)}
                    size={password.toggleSize}
                />
            </View>
            {error&&(
                <ErrorText error={error}/>
            )}
        </View>
    );
})

export default Password;
