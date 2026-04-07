import React from 'react';
import {useColor, View} from "../index.ts";
import {ColorProps} from "constants/colors.ts";
import {LoaderKitView} from "react-native-loader-kit";

type LoadingDotsProps = {
    color: ColorProps | string;
    size?: number;
    count?: number
}

const LoadingDots: React.FC<LoadingDotsProps> = (props) => {
    const { color, size = 6 } = props;
    const { colors } = useColor();

    return (
        <View>
            <LoaderKitView
                name={'LineSpinFadeLoader'}
                style={{ width: size, height: size }}
                color={color || colors.primary}
            />
        </View>
    );
};

export default LoadingDots;
