import React from 'react';
import Text from "../../default/Text";
import {View} from "../..";
import useColor from "hooks/use-color.ts";
import inputConfig from "./InputConfig";
import {Weight} from "../../../types";

export type LabelProps = {
	label:string
    focus?:boolean
    error?:boolean
    value?:any
}

const Label: React.FC<LabelProps> = (props) => {
    const {label,error,focus,value} = props;
    const color = error?"danger":focus?"primary":"text"

    return (
        <>
            <View mb={inputConfig.label.spacingBottom}>
                <Text
                    size={inputConfig.label.size}
                    color={color}
                    weight={inputConfig.label.weight as Weight}
                >
                    {label}
                </Text>
            </View>
        </>
    );
};

export default Label;
