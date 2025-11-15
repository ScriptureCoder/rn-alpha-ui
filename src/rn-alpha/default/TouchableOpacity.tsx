import React, {useState} from 'react';
import {TouchableOpacityProps, Pressable, TouchableOpacity as Touch} from "react-native";

type Props = {
    flex?:number
    w?:number
};

const TouchableOpacity: React.FC<TouchableOpacityProps&Props> = (props) => {
    const {style,flex,w} = props;

    return (
        <>
            <Touch
                {...props}
                style={[
                    {
                        flex,
                        width:w
                    },
                    style
                ]}
            >
                <>
                    {props.children}
                </>
            </Touch>
        </>
    );
};

export default TouchableOpacity;
