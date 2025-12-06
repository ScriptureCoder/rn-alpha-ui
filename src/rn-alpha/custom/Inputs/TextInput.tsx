import React, {useState,useEffect} from 'react';
import {TextInput as Element, TextInputProps} from "react-native";
import { ColorProps } from 'constants/colors';
import {ErrorText, Text, useColor, View} from "../../index.ts";
import {Weight} from "types";

type Props = {
	ref?:any
	onChangeText:(value:any)=>void
	bbw?:number
	btw?:number
	bw?:number
	bc?:ColorProps|string
	p?:number
	pv?:number
	ph?:number
	pt?:number
	placeholder?:string
	label?:string
	mt?:number
	maxH?:number
	minH?:number
	size?:number
	weight?:Weight
	color?:ColorProps
	br?:number
	error?:any
	flex?:number
}

const TextInput: React.FC<Props&TextInputProps> = React.forwardRef((props,ref:any)=>{
	const {colors} = useColor();

	const {
		onChangeText,
		label,
		bbw,
		btw,
		bw,
		bc,
		pv,
		ph,
		p,
		pt,
		placeholder,
		mt,
		maxH,
		minH,
		size,
		weight,
		color,
		br,
		flex,
		error,
		style,
		...others
	} = props;




	return (
		<View mt={mt}>
			{label&&(
				<Text size={13} color={"text"}>{label}</Text>
			)}
			<Element
				ref={ref}
				onChangeText={onChangeText}
				style={[style,{
					flex,
					borderWidth:bw,
					borderTopWidth:btw,
					borderBottomWidth:bbw,
					backgroundColor:color?colors[color]?colors[color]:color:undefined,
					borderColor:bc?colors[bc]?colors[bc]:bc:undefined,
					padding:p,
					paddingVertical:pv,
					paddingHorizontal:ph,
					paddingTop:pt,
					color:colors.text,
					maxHeight:maxH,
					minHeight:minH,
					fontSize:size,
					// fontFamily:`Nunito-${weight||'Regular'}`,
					borderRadius:br
				}]}
				placeholder={placeholder}
				placeholderTextColor={colors.placeholder}
				{...others}
			/>
			{error&&(
				<ErrorText error={error||""}/>
			)}
		</View>
	);
});

export default TextInput;
