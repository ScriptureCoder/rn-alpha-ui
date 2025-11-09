import React from 'react';
import {TouchableWithoutFeedback} from "react-native";
import { Svg, Text, View } from '..';

export type FabButtonProps = {
    icon:any
    bottom?:number
    onPress:()=>void
    text?:string
    size?:number
}

const FabButton: React.FC<FabButtonProps> = (props) => {
    const { icon, bottom, onPress, text, size} = props;

    return (
        <View position={"absolute"} right={20} bottom={bottom||35} overflow={"hidden"}>
            <TouchableWithoutFeedback onPress={onPress}>
                <View size={55} br={16} color={"primary"} fd={"flex-center"} ph={text?20:0} zIndex={1}>
                    <Svg icon={icon} size={size||18} color={"light"}/>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default FabButton;
