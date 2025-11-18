import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import {ColorProps} from "../../constants/colors";
import {Svg, Text, View,TouchableOpacity} from "..";
import {Weight} from "../../types";
import useColor from "hooks/use-color.ts";
import { useUIContext } from '../../theme/alpha-ui-context';
import LoadingDots from './LoadingDots';

export type ButtonProps = {
    title:string
    onPress:()=>void
    disabled?:boolean
    pv?:number
    ph?:number
    br?:number
    size?:number
    mt?:number
    mv?:number
    color?:ColorProps|string
    bc?:ColorProps|string
    bw?:number
    textColor?:ColorProps|string
    weight?:Weight
    icon?:string
    iconSize?:number
    loading?:boolean
}


const Button: React.FC<ButtonProps> = (props) => {
    const {colors} = useColor();
    const { componentProps } = useUIContext();
    const buttonDefaults = componentProps.Button || {};

    const mergedProps = {
        ...buttonDefaults,
        ...props,
    };

    const {
        title,
        mt,
        mv,
        size,
        onPress,
        color="primary",
        textColor="light",
        disabled=false,
        pv=15,
        ph,
        br=8,
        weight="Bold",
        bw,
        bc,
        icon,
        iconSize,
        loading
    } = mergedProps;

    const disable = disabled || loading

    return (
        <>
            <TouchableOpacity onPress={onPress} disabled={disable}>
                <View
                    mv={mv}
                    opacity={disable?0.6:1}
                    pv={pv}
                    ph={ph}
                    br={br}
                    mt={mt}
                    color={color}
                    bw={bw}
                    bc={bc}
                    fd={"flex-center"}
                >
                    {icon&&(
                        <View mr={10}>
                            <Svg icon={icon} size={iconSize||22} color={textColor}/>
                        </View>
                    )}
                    <Text
                        size={size||16}
                        weight={weight}
                        color={textColor}
                        align={"center"}
                    >
                        {title}
                    </Text>
                    {loading&&(
                        <View ml={10}>
                            <LoadingDots color={textColor} size={6} />
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        </>
    );
};

export default Button;
