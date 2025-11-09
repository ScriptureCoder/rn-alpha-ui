import React from 'react';
import {TextInput, ViewStyle} from "react-native";
import IconBtn from "../IconBtn";
import View from "../../default/View";
import inputConfig from "./InputConfig";
import {Svg} from "../..";
import {cancel, search} from "../../../assets/icons";
import useColor from "hooks/use-color.ts";

export type SearchInputProps = {
    filter:string
    setFilter:(value:string)=>void
    placeholder?:string
    style?:ViewStyle
    onSubmit?:(value:string)=>void
    focus?:boolean
}

const SearchInput: React.FC<SearchInputProps> = (props) => {
    const {filter, setFilter, placeholder="Search", style, onSubmit, focus} = props;
    const {colors} = useColor();
    const searchField = inputConfig.searchField;

    return (
        <>
            <View
                br={searchField.radius}
                bc={"border"}
                bw={searchField.borderWidth}
                pl={searchField.paddingHorizontal}
                pr={searchField.paddingHorizontal / 2}
                color={"background"}
                fd={"flex-item"}
                gap={searchField.textGap}
                style={style}
            >
                <Svg icon={search} size={searchField.iconSize} color={"medium"}/>
                <TextInput
                    autoFocus={focus}
                    style={{
                        flex:1,
                        paddingVertical:searchField.paddingVertical,
                        paddingLeft:searchField.textGap,
                        color:colors.text
                    }}
                    placeholder={placeholder}
                    placeholderTextColor={colors.placeholder}
                    value={filter}
                    onChangeText={(text)=>{setFilter(text)}}
                    returnKeyType={"search"}
                    onSubmitEditing={({nativeEvent})=>onSubmit?.(nativeEvent.text)}
                />
                {!!filter&&(
                    <IconBtn
                        icon={cancel}
                        size={Math.max(searchField.iconSize - 8, 10)}
                        height={searchField.clearSize}
                        width={searchField.clearSize}
                        background={"background"}
                        color={"text"}
                        onPress={() => setFilter("")}
                    />
                )}
            </View>
        </>
    );
};

export default SearchInput;
