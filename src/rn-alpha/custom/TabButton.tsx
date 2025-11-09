import React, {useState} from 'react';
import { KEY, Text, TouchableOpacity, View } from '../index';
import {ColorProps} from "constants/colors.ts";

type TabButtonProps = {
    index?: number
    options:string[]
    onTabPress:(index:number)=>void
    mt?:number
    ph?:number
    color?: ColorProps
    bc?: ColorProps
    textColor?: ColorProps
    activeTextColor?: ColorProps
    activeColor?: ColorProps
}

const TabButton: React.FC<TabButtonProps> = (props) => {
    const {
        ph,
        bc,
        index, options, onTabPress, mt, color, textColor, activeColor, activeTextColor} = props;
    const [tab,setTab] = useState(index||0);
    return (
        <View ph={ph||15} mt={mt||5}>
            <View color={color||"shade"} p={3} br={20} fd={"flex-row"} bc={bc||"border"} bw={0.5} overflow={"hidden"}>
                {options.map((title, i)=>(
                    <View key={KEY+i} flex={1} color={tab===i?(activeColor||"primary"):""} br={20}>
                        <TouchableOpacity onPress={()=> {
                            setTab(i)
                            onTabPress(i)
                        }}>
                            <View pv={8}>
                                <Text align={"center"} size={13} weight={"SemiBold"} color={tab===i?(activeTextColor||"light"):textColor||"text"}>{title}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default TabButton;
