import React, {useState} from 'react';
import {TouchableHighlightProps, TouchableHighlight as Touch} from "react-native";
import useColor from "../../hooks/use-color";

const TouchableHighlight: React.FC<TouchableHighlightProps> = (props) => {
    const {colors} = useColor()
    return (
        <>
            <Touch
                {...props}
                underlayColor={props.underlayColor||colors.shade}
            >
                <>
                    {props.children}
                </>
            </Touch>
        </>
    );
};

export default TouchableHighlight;
