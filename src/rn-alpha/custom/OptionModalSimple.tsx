import React from 'react';
import {ModalProps} from "types";
import {Modal} from "react-native";
import View from "../default/View";
import { Text } from '..';

export type PageModalProps = {
    close?:()=>void
    children:any
    title:string
    text?:string
    closableOnTouch?:boolean
}

const OptionModal: React.FC<PageModalProps&ModalProps> = (props) => {
    const {modal,setModal,close,children,title,text,closableOnTouch=true} = props;

    const closeFunc =()=>{
        close?.()
        setModal(false)
    }

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
                onRequestClose={closeFunc}
            >
                <>
                    <View flex={1} color={"modal"} fd={"flex-center"} p={25}>
                        <View color={"background"} p={10} br={10} maxW={400} flex={1} zIndex={1}>
                            <View p={10}>
                                {title&&(
                                    <Text size={15} weight={"Bold"} color={"text"} mb={5}>{title}</Text>
                                )}
                                {text&&(
                                    <Text size={13} color={"text2"} mt={7}>
                                        {text}
                                    </Text>
                                )}
                                {children}
                            </View>
                        </View>
                        {closableOnTouch&&(
                            <View inset={0} onTouchEnd={closeFunc}/>
                        )}
                    </View>
                </>
            </Modal>
        </>
    );
};

export default OptionModal;
