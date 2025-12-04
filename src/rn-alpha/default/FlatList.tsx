import React, {useState,useEffect} from 'react';
import {Animated, FlatList as Parent, FlatListProps} from "react-native";
import {SpacingProps} from "./View";
import { NativeSyntheticEvent } from "react-native/Libraries/Types/CoreEventTypes";
import { NativeScrollEvent } from "react-native/Libraries/Components/ScrollView/ScrollView";

export type Props = {
  ref?:any
  scrollX?:any,
  scrollY?:any,
  onScroll?:(event: NativeSyntheticEvent<NativeScrollEvent>)=>void,
  svs?:boolean
  shs?:boolean
}

export type CustomFlatListProps = Props&SpacingProps

const FlatList: React.FC<FlatListProps<any>&CustomFlatListProps> = React.forwardRef((props,ref:any)=>{
  const {
    scrollY,
    scrollX,
    onScroll,
    style,
    padding,p,
    margin,m,
    mt, mb, mh, ml, mr, mv,
    pb, ph, pl, pv, pt, pr,
    svs,
    shs,
    ...otherProps
  } = props

  const animated = scrollX||scrollY;
  const Comp = animated?Animated.FlatList:Parent

  const contentOffset:any = {};
  if (scrollY){
    contentOffset.y = scrollY
  }
  if (scrollX){
    contentOffset.x = scrollX
  }

  return (
      <Comp
          ref={ref}
          showsVerticalScrollIndicator={svs}
          showsHorizontalScrollIndicator={shs}
          {...otherProps}
          keyboardShouldPersistTaps='handled'
          style={[
            {
              marginTop:mt,
              marginBottom:mb,
              marginRight:mr,
              marginLeft:ml,
              marginHorizontal:mh,
              marginVertical:mv,
              paddingTop:pt,
              paddingBottom:pb,
              paddingVertical:pv,
              paddingHorizontal:ph,
              paddingLeft:pl,
              paddingRight:pr,
            },
            style
          ]}
          onScroll={
            animated?
                Animated.event(
                    [{
                      nativeEvent: {
                        contentOffset
                      },
                    }],
                    { useNativeDriver: true },
                ):
                (event)=>{onScroll?.(event)}
          }
          scrollEventThrottle={16}
      />
  );
});

export default FlatList;
