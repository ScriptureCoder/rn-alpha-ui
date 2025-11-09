import React, {useState} from 'react';
import { Image, Input, Select, Text, useColor, View } from '../..';
import countries from "utils/countries";
import inputConfig from "./InputConfig";
import Label from "./Label";
import countryCodeEmoji from "country-code-emoji";
import {ios} from "constants/layout.ts";
import {ColorProps} from "constants/colors";

type PhoneNumberInputProps = {
    onChangeText:(value:string)=>void
    value?:any
    error?:string
    label?:string
    mt?:number
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = (props) => {
    const {
        value,
        error,
        label,
        mt,
        onChangeText
    } = props;

    const [focus,setFocus] = useState(false);
    const [code,setCode] = useState("234-NG");
    const [number,setNumber] = useState("");
    const {colors} = useColor();
    const bc = error?colors.danger:focus?colors.primary:colors.border
    const { control, phoneNumber: phoneConfig } = inputConfig;
    const backgroundColor = colors[control.backgroundColorToken as ColorProps] || colors.background;

    return (
        <View mt={mt}>
            {label&&(
                <Label label={label} focus={focus} value={value} error={!!error}/>
            )}
            <View
                fd={"flex-item"}
                br={control.radius}
                bw={control.borderWidth}
                bc={bc}
                color={backgroundColor}
            >
                <Select
                    h={phoneConfig.selectHeight}
                    pv={0}
                    options={
                        countries.map((data)=>({
                            label:data.name+" +"+data.phonecode,
                            value:data.phonecode+"-"+data.sortname,
                            output:"+"+data.phonecode,
                            icon: (
                                <Text size={32}>
                                    {countryCodeEmoji(data.sortname)}
                                </Text>
                            )
                        }))
                    }
                    onChange={({value})=>{
                        setCode(value)
                        setNumber("")
                        onChangeText(value)
                    }}
                    defaultValue={code}
                    search
                    placeholder={"Select Country Code"}
                    bw={0.1}
                    renderSelect={(item)=>(
                        <View pl={phoneConfig.dialCodePaddingHorizontal} pr={2} fd={"flex-item"} gap={phoneConfig.gap}>
                            {item.icon}
                            <Text mb={ios?0:-2.5}>{item.output}</Text>
                        </View>
                    )}
                />
                {/*<View flex={1.8} ml={-52}>*/}
                <View flex={1}>
                    <Input
                        ph={0.1}
                        label={""}
                        value={number}
                        onChangeText={(value)=>{
                            setNumber(value)
                            onChangeText((code.replace(/\D/g,''))+value)
                        }}
                        h={phoneConfig.inputHeight}
                        maxLength={phoneConfig.maxLength}
                        keyboardType={"number-pad"}
                        bw={0.01}
                        onFocus={()=>setFocus(true)}
                        onBlur={()=> {
                            setFocus(false)
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export default PhoneNumberInput;
