import React, {useState, useEffect, useRef} from 'react';
import {Animated, Easing} from "react-native";
import {View} from "../index.ts";

type LoadingDotsProps = {
    color: string; size?: number; duration?: number
}

const DOT_COUNT = 3;

const LoadingDots: React.FC<LoadingDotsProps> = (props) => {
    const { color, size = 6, duration = 600 } = props;

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

export default LoadingDots;
