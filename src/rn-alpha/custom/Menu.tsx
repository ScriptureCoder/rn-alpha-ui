import React, {useState, ReactElement} from 'react';
import {KEY, TouchableOpacity} from "..";
import { Menu as Component, MenuItem } from 'react-native-material-menu';
import useColor from "hooks/use-color.ts";
import {ColorProps} from "constants/colors";
import {elevation} from "constants/elevation";

export type MenuProps = {
	anchor:ReactElement
	options:{
		label:string
		onPress:()=>void
		visible?:boolean
	}[]
	color?:ColorProps|string
	pressColor?:ColorProps|string
}

const Menu: React.FC<MenuProps> = (props) => {
	const {anchor, options, color,pressColor} = props;
	const [modal,setModal] = useState(false);
	const {colors} = useColor();

	return (
        <>
	        <Component
		        visible={modal}
		        anchor={
			        <TouchableOpacity onPress={()=>setModal(true)}>
				        {anchor}
			        </TouchableOpacity>
				}
		        onRequestClose={()=>{setModal(false)}}
		        style={{
			        backgroundColor:color?colors[color as ColorProps]?colors[color as ColorProps]:color:colors.background,
			        ...elevation(3),
		        }}
	        >
		        {options.map((data,i)=>(
			        (data.visible === undefined || data.visible)&&(
				        <MenuItem
					        key={KEY+i}
					        onPress={()=>{
						        setModal(false)
						        data.onPress()
					        }}
					        textStyle={{color:colors.text}}
					        pressColor={pressColor?colors[pressColor as ColorProps]?colors[pressColor as ColorProps]:pressColor:colors.shade}
				        >
					        {data.label}
				        </MenuItem>
			        )
		        ))}
	        </Component>
        </>
    );
};

export default Menu;
