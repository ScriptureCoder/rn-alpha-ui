import React, {useEffect, useState} from 'react';
import {
    TouchableWithoutFeedback,
    TouchableOpacity,
    ViewStyle, Keyboard,
} from "react-native";
import ErrorText from "./ErrorText";
import Label from "./Label";
import {selectToggle} from "assets/icons";
import { UIActivityIndicator } from 'react-native-indicators';
import Loader from "../Loader";
import { Modal, Svg, Text, View, SearchInput, Checkbox } from "../..";
import inputConfig from "./InputConfig";
import useColor from "hooks/use-color.ts";
import { FlatList } from '../..';
import {ColorProps} from "constants/colors";

export type SelectProps = {
    defaultValue?:any
    icon?:any
    placeholder?:string
    options:{label:string, value:string, text?:string, icon?:any,output?:string, hidden?:boolean}[]
    onChange:(data: { label:string, value:string, text?:string })=>void
    search?:boolean
    label?:string
    error?:any
    disabled?:boolean
    style?:ViewStyle
    mt?:number
    bw?:number
    loading?:boolean
    h?:number
    pv?:number
    color?:ColorProps
    renderSelect?:(item:Current)=>React.ReactNode
}

type Current = {
    value:string
    label:string
    text:string
    icon:any
    output:any
}

const Select: React.FC<SelectProps> = (props) => {
    const {
        defaultValue,
        loading,
        onChange,
        placeholder,
        bw,
        mt,
        disabled,
        error,
        icon,
        options,
        search,
        label,
        style,
        h,
        pv,
        renderSelect,
        color
    } = props

    const [modal,setModal] = useState(false);
    const [current,setCurrent] = useState<any>({value:"", label:"", text:"", icon:null, output:null});
    const [filter,setFilter] = useState("");
    const {colors} = useColor();
    const { control, select: selectConfig } = inputConfig;
    const fieldColor = color
        ? colors[color as ColorProps] ?? color
        : colors[control.backgroundColorToken as ColorProps] ?? colors.background;

    useEffect(()=>{
        const selected = options?.filter((r:any)=>r.value === defaultValue)?.[0];
        if (selected){
            setCurrent(selected)
        }
    },[]);

    const handleSelect=(data:any)=>{
        Keyboard.dismiss()
        if (current.value===data.value){
            const value = {value:"", label:"", text:""}
            setCurrent(value)
            onChange(value)
        }else {
            setCurrent(data)
            onChange(data)
            setModal(false)
        }
    }

    const goBack=()=>{
        setCurrent({value:"", label:"", text:""})
        onChange({value:"", label:""})
        setModal(false)
    }

    const submit=()=>{
        setModal(false)
        onChange(current)
        setFilter("")
    }

    return (
        <>
            {
                renderSelect?
                    <TouchableWithoutFeedback disabled={disabled} onPress={()=> {
                        Keyboard.dismiss()
                        setModal(true)
                    }}>
                        {renderSelect(current)}
                    </TouchableWithoutFeedback>:
                <View style={{marginTop:mt,...style}}>
                    {label&&(
                        <Label label={label}/>
                    )}
                    <TouchableWithoutFeedback disabled={disabled} onPress={()=> {
                        Keyboard.dismiss()
                        setModal(true)
                    }}>
                        <View
                            opacity={disabled?control.disabledOpacity:1}
                            br={control.radius}
                            color={fieldColor}
                            ph={selectConfig.paddingHorizontal}
                            pv={pv||selectConfig.paddingVertical}
                            fd={"flex-item"}
                            bw={bw||control.borderWidth}
                            bc={error?"danger":"border"}
                            h={h||selectConfig.height}
                            gap={control.gap}
                        >
                            {icon&&(
                                <View
                                    width={selectConfig.iconWrapperSize}
                                    height={selectConfig.iconWrapperSize}
                                    fd={"flex-center"}
                                    br={selectConfig.iconWrapperRadius}
                                    mr={10}
                                    color={"shade3"}
                                >
                                    <Svg icon={icon} color={"primary"}/>
                                </View>
                            )}
                            {current.icon}
                            <View style={{flex:1}} ml={current.icon?10:0}>
                                <Text
                                    weight={current.text?"Medium":"Regular"}
                                    color={current.value?colors.text:colors.placeholder}
                                    numberOfLines={1}
                                >
                                    {current.value?current.output?current.output:current.label:placeholder||"Select"}
                                </Text>
                                {!!current.text&&<Text color={"medium"}>{current.value?current.text:""}</Text>}
                            </View>
                            <View ml={5}>
                                {loading?
                                    <UIActivityIndicator size={selectConfig.loaderSize} color={colors.text2}/>:
                                    <Svg icon={selectToggle} color={"text"} size={selectConfig.dropdownIconSize}/>
                                }
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    {error&&(
                        <ErrorText error={error}/>
                    )}
                </View>
            }

            <Modal setModal={submit} modal={modal} full={search} showCloseBtn>
                <View flex={1}>
                    <View ph={selectConfig.modalPadding} gap={10}>
                        <View pb={10}>
                            <Text size={17} align={selectConfig.align||"left"} weight={"Bold"} color={"text"}>{label||placeholder||"Select"}</Text>
                        </View>
                        {search&&(
                            <View>
                                <SearchInput filter={filter} setFilter={setFilter}/>
                            </View>
                        )}
                    </View>
                    <View flex={1}>
                        <Loader loading={loading||false}/>
                        <FlatList
                            style={{paddingHorizontal:selectConfig.modalPadding}}
                            data={!loading&&options?.filter((r:any)=>{
                                return r.label.toLowerCase().indexOf(filter.toLowerCase()) > -1
                            })||[]}
                            ListHeaderComponent={<View h={20}/>}
                            showsVerticalScrollIndicator={true}
                            keyExtractor={(item, index)=>item.value+"select"+index}
                            renderItem={({item,index})=> (
                                <TouchableOpacity onPress={()=>handleSelect(item)}>
                                    <View fd={"flex-between"} pv={selectConfig.optionPaddingVertical} btw={index?1:0} bc={"border"}>
                                        <View flex={1} mr={10} fd={"flex-item"} gap={selectConfig.optionGap}>
                                            {item.icon}
                                            <View flex={1} ml={item.icon?5:0}>
                                                <Text size={13} color={"text"}>{item.label}</Text>
                                                {!!item.text&&(
                                                    <Text size={13} color={"text2"}>{item.text}</Text>
                                                )}
                                            </View>
                                        </View>
                                        <Checkbox selected={current.value===item.value} setSelected={()=>handleSelect(item)} color={"primary"}/>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default Select;
