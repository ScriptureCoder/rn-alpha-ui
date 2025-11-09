import React, { useEffect, useRef } from 'react';
import { Text, View } from "..";
import useColor from "hooks/use-color.ts";
import { Animated, Easing, Modal } from "react-native";
import { Image } from '..';

type props = {
    text?:string
    title?:string
    close?:any
    loading:boolean
    opacity?:number
}

const Preloader: React.FC<props> = (props) => {
    const {text,title,loading,close, opacity} = props;
    const {colors} = useColor()
    const scaleAnimation = useRef(new Animated.Value(1)).current;
    const loopRef = useRef<Animated.CompositeAnimation | null>(null);

    useEffect(() => {
        loopRef.current?.stop();

        if (loading) {
            const loop = Animated.loop(
                Animated.sequence([
                    Animated.timing(scaleAnimation, {
                        toValue: 1.5,
                        duration: 350,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(scaleAnimation, {
                        toValue: 1,
                        duration: 350,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ]),
                { resetBeforeIteration: true }
            );

            loopRef.current = loop;
            loop.start();
        } else {
            scaleAnimation.stopAnimation(() => {
                scaleAnimation.setValue(1);
            });
            loopRef.current = null;
        }

        return () => {
            loopRef.current?.stop();
            loopRef.current = null;
        };
    }, [loading, scaleAnimation]);

    return (
        <>
            <Modal
                transparent={true}
                visible={loading}
                onRequestClose={() => {
                    if (close){
                        close(false)
                    }
                }}
            >
                <View flex={1} color={"#1F2021A3"} fd={"flex-center"}>
                    <View height={120} position={"absolute"} fd={"col-center"} opacity={opacity}>
                        <Text size={16} color={"text"} weight={"Bold"}>{title}</Text>
                        <Animated.View
                            style={{
                                transform: [{ scale: scaleAnimation }],
                            }}
                        >
                            <View size={35} br={6} color={"background"} fd={"flex-center"}>
                                {/*<Svg icon={icon} size={27} color={"primary"}/>*/}
                                <Image source={require("../../assets/images/icon.png")} size={35}/>
                            </View>
                        </Animated.View>
                        <Text size={14} color={"text"} >{text}</Text>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default Preloader;
