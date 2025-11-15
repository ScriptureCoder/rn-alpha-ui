import React, { PropsWithChildren, useState } from "react";
import {TouchableNativeFeedback as Touch} from "react-native";
import useColor from "../../hooks/use-color";

export type TouchableNativeFeedbackProps = {
    borderless?:boolean
    onPress:()=>void
    onLongPress?:()=>void
    disabled?:boolean
}

const TouchableNativeFeedback: React.FC<PropsWithChildren<TouchableNativeFeedbackProps>> = (props) => {
    const { borderless=false, onPress, children, disabled, onLongPress} = props;
    const {colors} = useColor();

    return (
        <>
            <Touch background={Touch.Ripple(colors.shade, borderless)} onLongPress={onLongPress} disabled={disabled} onPress={onPress}>
                {children}
            </Touch>
        </>
    );
};

export default TouchableNativeFeedback;
