import React from 'react';
import {Switch as Parent} from "react-native";
import useColor from "hooks/use-color.ts";
import {ColorProps} from "constants/colors.ts";

export type SwitchProps = {
	disabled?:boolean
	active:boolean
	onToggle:(value:boolean)=>void
	bg?:ColorProps | string
	trackPositive?: ColorProps | string
	trackNegative?: ColorProps | string
}

const Switch: React.FC<SwitchProps> = (props) => {
	const {colors} = useColor();
	const {
		disabled,
		active,
		onToggle,
		bg,
		trackPositive,
		trackNegative,
	} = props;

    return (
	    <Parent
			onTouchEnd={()=>onToggle(!active)}
		    trackColor={{
				false: colors[trackNegative||"medium"],
				true: colors[trackPositive||"primary"]
			}}
		    thumbColor={colors.light}
		    ios_backgroundColor={colors[bg||"shade"]}
		    onValueChange={()=> {
				// onToggle(!active)
			}}
		    value={active}
		    disabled={disabled}
	    />
    );
};

export default Switch;
