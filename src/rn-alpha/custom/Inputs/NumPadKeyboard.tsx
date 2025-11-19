import React from 'react';
import {KEY, Svg, Text, View} from 'rn-alpha';
import {TouchableWithoutFeedback} from "react-native";
import {backspace} from "assets/icons";

type NumPadKeyboardProps = {
    setValue: React.Dispatch<React.SetStateAction<string>>;
    max?: number;
    onDone?: (value: string)=> void
    children?: React.ReactNode;
}

const NumPadKeyboard: React.FC<NumPadKeyboardProps> = (props) => {
    const {setValue, max, onDone, children} = props;

    const numbers = [
        ["1","2","3"],["4","5","6"],["7","8","9"],["children","0", "Del"]
    ]

    return (
        <>
            <View fd={"col-between"} gap={25}>
                {numbers.map((item, i)=>(
                    <View key={KEY+"key"+i} fd={"flex-center"}>
                        {item.map((value, i)=>(
                            <View flex={1} fd={"flex-center"} key={KEY+"ww"+i+value}>
                                {!!value&&(
                                    <TouchableWithoutFeedback onPress={()=>{
                                        if (value==="Del") {
                                            setValue((pin)=>pin.slice(0, -1))
                                        }else {
                                            setValue((pin)=> {
                                                if ((pin + value).length === max){
                                                    onDone(pin + value)
                                                }
                                                return pin.length < max ? pin + value : pin
                                            })
                                        }
                                    }}>
                                        <View size={72} br={36} fd={"flex-center"} color={"shade"}>
                                            {value==="Del"?
                                                <Svg icon={backspace} color={"danger"} size={24}/>:
                                                value==="children"?
                                                    children:
                                                    <Text size={25} color={"text"} weight={"Bold"}>{value}</Text>
                                            }
                                        </View>
                                    </TouchableWithoutFeedback>
                                )}
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </>
    );
};

export default NumPadKeyboard;
