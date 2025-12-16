import React from 'react';
import { TouchableHighlight as Base, ViewStyle } from "react-native";
import { ColorProps } from "constants/colors";
import {useColor} from "../index.ts";

type TouchableHighlightProps = {
    children:React.ReactElement
    onPress?:()=>void
    onLongPress?:()=>void
    style?:ViewStyle
    color?:ColorProps
    disabled?:boolean
}

const TouchableHighlight: React.FC<TouchableHighlightProps> = (props) => {
    const {onLongPress, disabled, children, onPress, style, color} = props;
    const {colors} = useColor();

    return (
        <Base
            activeOpacity={0.6}
            underlayColor={color?colors[color]:colors.shade}
            onPress={onPress}
            onLongPress={onLongPress}
            style={style}
            disabled={disabled}
        >
            {children}
        </Base>
    );
};

export default TouchableHighlight;
