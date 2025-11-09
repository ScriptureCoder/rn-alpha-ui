import React from 'react';
import { OtpInput as Input } from "react-native-otp-entry";
import { Keyboard } from "react-native";
import { useColor } from '../..';
import { width as screenWidth } from "../../../constants/layout";
import {ColorProps} from "constants/colors.ts";
import inputConfig from "./InputConfig";

type OtpInputProps = {
	setCode:(value:string)=>void
	secureTextEntry?:boolean,
	pinCount?:number
	color?: ColorProps
}

const OtpInput: React.FC<OtpInputProps> = (props) => {
    const {pinCount=4, setCode, secureTextEntry=true, color} = props;
	const {colors} = useColor();
	const size = (screenWidth/pinCount)-20;
	const otp = inputConfig.otp;
	const cellWidth = pinCount>4?size:otp.width;
	const cellHeight = pinCount>4?size+5:otp.height;

    return (
        <>
			<Input
				numberOfDigits={pinCount||6}
				focusColor={colors.primary}
				focusStickBlinkingDuration={500}
				onTextChange={(text) => console.log(text)}
				onFilled={(code)=>{
					setCode(code)
					Keyboard.dismiss()
				}}
				secureTextEntry={secureTextEntry}
				textInputProps={{
					// accessibilityLabel: "One-Time Password",
					// returnKeyType:'done'
				}}
				theme={{
					pinCodeContainerStyle: {
						width: cellWidth,
						height: cellHeight,
						borderWidth: otp.borderWidth,
						borderRadius: otp.borderRadius,
						backgroundColor:color?colors[color as ColorProps]?colors[color as ColorProps]:color:undefined,
					},
					pinCodeTextStyle: {
						fontSize:otp.fontSize,
						borderColor:colors.border,
						color: colors.text
					},
					// focusStickStyle: styles.focusStick,
					// focusedPinCodeContainerStyle: styles.activePinCodeContainer,
				}}
			/>
		</>
    );
};

export default OtpInput;
