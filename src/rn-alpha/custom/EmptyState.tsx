import React, {useState,useEffect} from 'react';
import { Button, Svg, Text, View } from '..';

type EmptyStateProps = {
    icon: string
    text: string
    iconSize?: number
    btn?:{
        title: string
        onPress: ()=>void
    }
    mt?:number
}

const EmptyState: React.FC<EmptyStateProps> = (props) => {
    const {
        icon,
        iconSize,
        text,
        btn,
        mt
    } = props;

    return (
        <View maxW={300} gap={24} fd={"col-center"} align={"center"} mv={40} mt={mt}>
            <Svg icon={icon} size={iconSize||96} color={"medium"}/>

            <Text size={13} color={"medium"} align={"center"}>
                {text}
            </Text>

            {btn&&(
                <Button
                    title={btn.title}
                    size={13}
                    onPress={btn.onPress}
                    ph={24}
                />
            )}
        </View>
    );
};

export default EmptyState;
