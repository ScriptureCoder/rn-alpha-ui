import React from 'react';
import {Animated, RefreshControl, ScrollView as Scroll, ScrollViewProps, View as Parent, ViewStyle} from "react-native";
import { ColorProps } from "constants/colors.ts";
import useColor from "../../hooks/use-color";

export type RefreshProps = {
  refreshing?:boolean
  onRefresh?:()=>void
  bounces?:boolean
  svs?:boolean
  shs?:boolean
  padding?:number|string
  p?:number|string
  ph?:number,
  scrollX?:any,
  scrollY?:any,
  onScroll?:()=>void,
  ref?:any
  pb?:number
  pt?:number
  cs?:ViewStyle
  color?:ColorProps
};

const ScrollView: React.FC<ScrollViewProps&RefreshProps> = React.forwardRef((props,ref:any)=> {
  const {
    padding,p,
    refreshing,onRefresh,children,bounces,style,ph,pb,pt,
    svs,
    shs,
    scrollY,
    scrollX,
    onScroll,
    color,
    cs={},
    ...otherProps
  } = props

  const animated = scrollX||scrollY;
  const Comp = animated?Animated.ScrollView:Scroll

  const contentOffset:any = {};
  if (scrollY){
    console.log(contentOffset.y);
    contentOffset.y = scrollY
  }
  if (scrollX){
    contentOffset.x = scrollX
  }

  const {colors} = useColor();


  return (
      <Comp
          ref={ref}
          contentContainerStyle={{
            ...cs,
            paddingBottom:pb||40,
            paddingTop:pt||0,
            backgroundColor:color?colors[color]?colors[color]:color:undefined,
          }}
          style={[{
            padding:( padding || p ) as number,
            paddingHorizontal: ph
          },style]}
          {...otherProps}
          keyboardShouldPersistTaps='handled'
          bounces={bounces}
          refreshControl={
            onRefresh?
                <RefreshControl
                    refreshing={refreshing||false}
                    onRefresh={onRefresh}
                />:undefined
          }
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
                ()=>{onScroll?.()}
          }
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={svs}
          showsHorizontalScrollIndicator={shs}
      >
        {children}
      </Comp>
  );
});

export default ScrollView;
