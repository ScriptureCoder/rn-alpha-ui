import React from 'react';
import useColor from "hooks/use-color.ts";
import { Svg, TextInput, TouchableOpacity, View } from '../..';
import {cancel, search} from "../../../assets/icons";
import {ViewStyle} from "react-native";
import inputConfig from "./InputConfig";

type FilterSearchInputProps = {
	filter:string
	setFilter:(value:string)=>void
	placeholder?:string
	style?:ViewStyle
	onSubmit?:(value:string)=>void
	focus?:boolean
	loading?:boolean
}

const FilterSearchInput: React.FC<FilterSearchInputProps> = (props) => {
	const {filter, setFilter, placeholder="Search", style, onSubmit, focus, loading} = props;
	const {colors} = useColor();
	const filterConfig = inputConfig.filterSearch;
	const searchField = inputConfig.searchField;

	const disabled = loading || !filter
	return (
		<>
			<View
				br={filterConfig.radius}
				overflow={"hidden"}
				bc={"border"}
				pl={filterConfig.fieldPaddingLeft}
				color={"shade"}
				fd={"flex-item"}
				style={style}
			>
				{/*<Svg icon={search} size={20} color={"text2"}/>*/}
				<View flex={1} pl={10}>
					<TextInput
						pv={searchField.paddingVertical}
						autoFocus={focus}
						placeholder={placeholder}
						placeholderTextColor={colors.placeholder}
						value={filter}
						onChangeText={(text)=>{setFilter(text)}}
						returnKeyType={"search"}
						onSubmitEditing={({nativeEvent})=>onSubmit?.(nativeEvent.text)}
					/>
				</View>
				<TouchableOpacity onPress={()=>{onSubmit?.(filter)}} disabled={disabled}>
					<View
						ph={filterConfig.buttonPaddingHorizontal}
						pv={filterConfig.buttonPaddingVertical}
						fd={"flex-item"}
						color={"primary"}
						opacity={disabled?0.5:1}
					>
						<Svg icon={search} size={filterConfig.iconSize} color={"light"}/>
					</View>
				</TouchableOpacity>
			</View>
		</>
	);
};

export default FilterSearchInput;
