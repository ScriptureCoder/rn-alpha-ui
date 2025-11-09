import React from 'react';
import {TouchableWithoutFeedback} from "react-native";
import {View} from "../..";
import Svg from "../Svg";
import {check} from "assets/icons";
import { ColorProps } from "constants/colors";
import inputConfig from "./InputConfig";

export type CheckboxProps = {
    selected:boolean
    setSelected:(value:boolean)=>void
    color?:ColorProps,
    box?:boolean
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
    const {selected,setSelected,color="primary",box} = props;
    const {
        size,
        borderWidth,
        circularRadius,
        squareRadius,
        innerSize,
    } = inputConfig.checkbox;
    const br = box?squareRadius:circularRadius;

    return (
        <TouchableWithoutFeedback onPress={()=>setSelected(!selected)}>
            <View>
                {selected?
                    <View
                        color={box?"primary":"background"}
                        bc={color}
                        size={size}
                        bw={borderWidth}
                        br={br}
                        padding={2}
                        fd={"flex-center"}
                    >
                        {box?
                            <Svg icon={check} color={"light"} size={15}/>:
                            <View color={color} size={innerSize} br={br}/>
                        }
                    </View>:
                    <View
                        color={"background"}
                        bc={"medium"}
                        size={size}
                        bw={borderWidth}
                        br={br}
                        padding={1}
                        fd={"flex-center"}
                    />
                }
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Checkbox;
