import React from 'react';
import {Switch as Parent} from "react-native";
import useColor from "hooks/use-color.ts";

export type SwitchProps = {
	disabled?:boolean
	active:boolean
	onToggle:(value:boolean)=>void
}

const Switch: React.FC<SwitchProps> = (props) => {
	const {colors} = useColor();
	const {disabled,active,onToggle} = props;

    return (
	    <Parent
			onTouchEnd={()=>onToggle(!active)}
		    trackColor={{ false: colors.medium, true: colors.primary }}
		    thumbColor={colors.light}
		    ios_backgroundColor={colors.shade}
		    onValueChange={()=>onToggle(!active)}
		    value={active}
		    disabled={disabled}
	    />
    );
};

export default Switch;
