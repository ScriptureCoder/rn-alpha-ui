import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import {ColorProps} from "../../constants/colors";
import {Svg, Text, View,TouchableOpacity} from "..";
import {Weight} from "../../types";
import useColor from "hooks/use-color.ts";
import { useUIContext } from '../../theme/alpha-ui-context';

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

const DOT_COUNT = 3;

const LoadingDots: React.FC<{color: string; size?: number; duration?: number}> = ({color, size = 6, duration = 600}) => {
    const progress = useRef(
        Array.from({length: DOT_COUNT}, () => new Animated.Value(0))
    ).current;

    useEffect(() => {
        const animations = progress.map((value, index) =>
            Animated.loop(
                Animated.sequence([
                    Animated.delay(index * (duration / DOT_COUNT)),
                    Animated.timing(value, {
                        toValue: 1,
                        duration: duration / 2,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true
                    }),
                    Animated.timing(value, {
                        toValue: 0,
                        duration: duration / 2,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true
                    })
                ])
            )
        );

        animations.forEach((animation) => animation.start());

        return () => {
            animations.forEach((animation) => animation.stop());
        };
    }, [progress, duration]);

    return (
        <View fd={"flex-row"}>
            {progress.map((value, index) => (
                <Animated.View
                    key={index}
                    style={{
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                        backgroundColor: color,
                        marginLeft: index === 0 ? 0 : size * 0.6,
                        opacity: value.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.3, 1]
                        }),
                        transform: [
                            {
                                scale: value.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.6, 1]
                                })
                            }
                        ]
                    }}
                />
            ))}
        </View>
    );
};

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
    const loaderColor = colors[textColor as ColorProps] ?? textColor;

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
                            <LoadingDots color={typeof loaderColor === "string" ? loaderColor : String(loaderColor)} size={6} />
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        </>
    );
};

export default Button;
