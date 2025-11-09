import React from 'react';
import {TextInput as Element, TextInputProps} from "react-native";
import useColor from "hooks/use-color.ts";
import {ColorProps} from "constants/colors";
import {ErrorText, Text, View} from "../..";
import {Weight} from "types";

type Props = {
	onChangeText?: (value: any) => void;
	bbw?: number;
	btw?: number;
	bw?: number;
	bc?: ColorProps | string;
	p?: number;
	pv?: number;
	ph?: number;
	pt?: number;
	label?: string;
	mt?: number;
	maxH?: number;
	minH?: number;
	size?: number;
	weight?: Weight;
	color?: ColorProps | string;
	br?: number;
	error?: string;
	flex?: number;
};

const TextInput = React.forwardRef<Element, Props & TextInputProps>((props, ref) => {
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
		        style={{
			        flex,
					borderWidth:bw,
					borderTopWidth:btw,
					borderBottomWidth:bbw,
			        backgroundColor:color?colors[color]?colors[color]:color:undefined,
			        borderColor:bc?colors[bc as ColorProps]?colors[bc as ColorProps]:bc:undefined,
			        padding:p,
			        paddingVertical:pv,
			        paddingHorizontal:ph,
			        paddingTop:pt,
			        color:colors.text,
			        maxHeight:maxH,
			        minHeight:minH,
			        fontSize:size,
			        fontFamily:`Poppins-${weight||'Regular'}`,
			        borderRadius:br
		        }}
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
