import React, {useState,useEffect} from 'react';
import View from "../default/View";
import {Modal} from "react-native";
import {ModalProps} from "../../types";
import {ColorProps} from "../../constants/colors";

export type PageModalProps = {
	close?:()=>void
	children:any
	closableOnTouch?:boolean
	color?:ColorProps
}

const PageModal: React.FC<PageModalProps&ModalProps> = (props) => {
	const {modal,setModal,close,children,closableOnTouch,color="modal"} = props;

	const closeFunc =()=>{
		close?.()
		setModal(false)
	}

	return (
        <>
	        <Modal
		        animationType="none"
		        transparent={true}
		        visible={modal}
		        onRequestClose={closeFunc}
	        >
		        <View flex={1} color={color}>
			        {children}
			        {closableOnTouch&&(
				        <View inset={0} onTouchEnd={closeFunc}/>
			        )}
		        </View>
	        </Modal>
        </>
    );
};

export default PageModal;
