import React, { useRef, useEffect } from 'react';
import {TouchableWithoutFeedback, Modal as Mod, Animated, Dimensions, StyleSheet} from "react-native";
import {PanGestureHandler, State, GestureHandlerRootView} from "react-native-gesture-handler";
import {ModalProps} from "types";
import View from '../default/View';
import {height, ios} from "constants/layout.ts";
import KeyboardView from '../default/KeyboardView';
import {Svg, TouchableOpacity, useDimensions} from "../index.ts";
import {cancel} from "assets/icons";

type Props = {
    onClose?:()=>void
    children:any
    full?:boolean
    enableSwipeToClose?:boolean
    showCloseBtn?:boolean
}

const Modal: React.FC<ModalProps&Props> = (props) => {
    const { modal,setModal,onClose,full, children, enableSwipeToClose=true, showCloseBtn } = props;
    const translateY = useRef(new Animated.Value(0)).current;
    const sheetTranslateY = useRef(new Animated.Value(full ? 0 : height)).current;
    const backdropOpacity = useRef(new Animated.Value(0)).current;
    const screenHeight = Dimensions.get('window').height;

    const closeFunc =()=>{
        // Animate slide down and fade out before closing
        Animated.parallel([
            Animated.timing(sheetTranslateY, {
                toValue: height,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(backdropOpacity, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            })
        ]).start(() => {
            // Call close callbacks after animation completes
            onClose?.();
            setModal(false);
        });
    }

    // Animate sheet in when modal opens
    useEffect(() => {
        if (modal) {
            // Reset translateY to 0 when opening
            translateY.setValue(0);
            // Animate both sheet and backdrop in
            Animated.parallel([
                Animated.timing(sheetTranslateY, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(backdropOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                })
            ]).start();
        } else {
            sheetTranslateY.setValue(full ? 0 : height);
            backdropOpacity.setValue(0);
        }
    }, [modal, full]);

    const onGestureEvent = (event: any) => {
        const { translationY: gestureY } = event.nativeEvent;
        // Only allow downward movement (positive values)
        if (gestureY >= 0) {
            translateY.setValue(gestureY);
            // Also fade backdrop based on drag distance
            const dragRatio = Math.min(gestureY / 200, 1); // Fade over 200px
            backdropOpacity.setValue(1 - dragRatio * 0.5); // Fade to 50% opacity
        }
    };

    const onHandlerStateChange = (event: any) => {
        if (event.nativeEvent.state === State.END) {
            const { translationY, velocityY } = event.nativeEvent;

            // Only allow downward swipes to close
            if (translationY > 0) {
                // Close if swiped down more than 80px or with high velocity
                if (translationY > 80 || velocityY > 300) {
                    closeFunc();
                } else {
                    // Snap back to original position
                    Animated.parallel([
                        Animated.spring(translateY, {
                            toValue: 0,
                            useNativeDriver: true,
                            tension: 100,
                            friction: 8,
                        }),
                        Animated.spring(backdropOpacity, {
                            toValue: 1,
                            useNativeDriver: true,
                            tension: 100,
                            friction: 8,
                        })
                    ]).start();
                }
            } else {
                // If swiped up, snap back to original position immediately
                Animated.parallel([
                    Animated.spring(translateY, {
                        toValue: 0,
                        useNativeDriver: true,
                        tension: 200,
                        friction: 8,
                    }),
                    Animated.spring(backdropOpacity, {
                        toValue: 1,
                        useNativeDriver: true,
                        tension: 200,
                        friction: 8,
                    })
                ]).start();
            }
        }
    };

    const { bottom } = useDimensions()

    return (
        <>
            {modal&&(
                <View bottom={0} insetX={0} height={bottom+10} color={"background"} zIndex={1}/>
            )}
            <Mod
                animationType="none"
                transparent={true}
                visible={modal}
                onRequestClose={closeFunc}
                // navigationBarTranslucent
                statusBarTranslucent
            >
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <KeyboardView>
                        <View flex={1}>
                            <Animated.View
                                style={{
                                    ...StyleSheet.absoluteFillObject,
                                    opacity: backdropOpacity
                                }}
                            >
                                <View flex={1} color={"modal"}>
                                    <TouchableWithoutFeedback onPress={closeFunc}>
                                        <View flex={full?0.1:1}/>
                                    </TouchableWithoutFeedback>
                                </View>
                            </Animated.View>
                            {enableSwipeToClose ? (
                                <PanGestureHandler
                                    onGestureEvent={onGestureEvent}
                                    onHandlerStateChange={onHandlerStateChange}
                                    activeOffsetY={10}
                                >
                                    <Animated.View
                                        style={{
                                            transform: [
                                                { translateY: Animated.add(translateY, sheetTranslateY) }
                                            ],
                                            ...(full ? {
                                                flex: 1,
                                                paddingTop: height * 0.1
                                            } : {
                                                position: "absolute",
                                                bottom: 0, left: 0, right: 0,
                                                maxHeight: height * 0.9
                                            })
                                        }}
                                    >
                                        <View
                                            color={"background"}
                                            btrr={22}
                                            btlr={22}
                                            style={full ? {
                                                flex: 1,
                                            } : {
                                                position: "absolute",
                                                bottom: 0, left: 0, right: 0,
                                                maxHeight: height * 0.9
                                            }}
                                        >
                                            <View onTouchEnd={closeFunc} pv={10} pb={25}>
                                                <View width={50} height={4} color={"medium"} br={3} align={"center"}/>
                                            </View>

                                            {showCloseBtn&&(
                                                <View absolute right={10} top={10}>
                                                    <TouchableOpacity onPress={closeFunc}>
                                                        <View size={32} br={32/2} fd={"flex-center"} color={"shade"}>
                                                            <Svg icon={cancel} size={10} color={"text"}/>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            )}
                                            {children}
                                            <View height={ bottom+10 }/>
                                        </View>
                                    </Animated.View>
                                </PanGestureHandler>
                            ) : (
                                <Animated.View
                                    style={{
                                        transform: [{ translateY: sheetTranslateY }],
                                        ...(full ? {
                                            flex: 1,
                                            paddingTop: height * 0.1
                                        } : {
                                            position: "absolute",
                                            bottom: 0, left: 0, right: 0,
                                            maxHeight: height * 0.9
                                        })
                                    }}
                                >
                                    <View
                                        color={"background"}
                                        btrr={22}
                                        btlr={22}
                                        style={full ? {
                                            flex: 1,
                                        } : {
                                            position: "absolute",
                                            bottom: 0, left: 0, right: 0,
                                            maxHeight: height * 0.9
                                        }}
                                    >
                                        <View pv={10} pb={25} onTouchStart={closeFunc}>
                                            <View width={50} height={4} color={"medium"} br={3} align={"center"}/>
                                        </View>
                                        {showCloseBtn&&(
                                            <View absolute right={10} top={10}>
                                                <TouchableOpacity onPress={closeFunc}>
                                                    <View size={32} br={32/2} fd={"flex-center"} color={"shade"}>
                                                        <Svg icon={cancel} size={10} color={"text"}/>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                        {children}
                                        <View height={ bottom+10 }/>
                                    </View>
                                </Animated.View>
                            )}
                        </View>
                    </KeyboardView>
                </GestureHandlerRootView>
            </Mod>
        </>
    );
};

export default Modal;
