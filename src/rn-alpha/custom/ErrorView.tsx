import React, {useState,useEffect} from 'react';
import { Button, Svg, Text, View } from '..';

export type ErrorViewProps = {
	error:string
	refetch?:()=>void
	mt?:number
}

const ErrorView: React.FC<ErrorViewProps> = (props) => {
	let {error, refetch, mt} = props;

    return (
        <>
	        <View flex={1} color={"background"} mt={mt}>
		        <View flex={1} p={15}>
			        <View fd={"col-center"} mt={40}>
				        <Text mt={34} size={13} color={"medium"}>{error}</Text>
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
