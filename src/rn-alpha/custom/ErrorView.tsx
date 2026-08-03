import React, {useState,useEffect} from 'react';
import { Button, Svg, Text, View } from '..';
import {caution} from "assets/icons";

export type ErrorViewProps = {
	error:string
	refetch?:()=>void
	mt?:number
}

const ErrorView: React.FC<ErrorViewProps> = (props) => {
	let {error, refetch, mt} = props;

    return (
        <>
	        <View flex={1} color={"background"} fd={"col-center"} mt={mt}>
		        <View flex={1} p={15} gap={40}>
					<View fd={"flex-center"}>
						<Svg icon={caution} size={40} color={"text"}/>
					</View>
			        <View fd={"col-center"}>
				        <Text mt={34} size={13} color={"medium"} align={"center"}>{error}</Text>
			        </View>
			        {refetch&&(
				        <View mt={40} w={200} align={"center"}>
					        <Button title={"Try again"} pv={10} onPress={()=>{refetch?.()}}/>
				        </View>
			        )}
		        </View>
	        </View>
        </>
    );
};

export default ErrorView;
