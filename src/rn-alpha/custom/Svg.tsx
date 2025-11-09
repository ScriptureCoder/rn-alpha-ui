import React from "react";
import { SvgXml } from "react-native-svg";
import {ColorProps} from "constants/colors";
import { View } from "..";
import useColor from "hooks/use-color.ts";

export type SvgProps = {
    icon:any
    color?:ColorProps|string
    size?:number
    w?:number
}

const Svg: React.FC<SvgProps> = ({icon,color,size,w}) => {
    const {colors} = useColor()
    const SvgImage = () => (
        <View w={w||size||24}>
            <SvgXml color={color?colors[color as ColorProps]?colors[color as ColorProps]:color:undefined} height={size||24} xml={icon} width="100%"/>
        </View>
    );
    return <SvgImage />;
};

export default Svg;
