import React from 'react';
import {Animated, FlexAlignType, View as Parent, ViewProps} from "react-native";
import {ColorProps} from "constants/colors.ts";
import {elevation} from "constants/elevation.ts";
import useColor from "../../hooks/use-color";
import {useUIContext} from "theme/alpha-ui-context.tsx";

export interface Props extends ViewProps {
    ref?:any
    flex?:number
    color?:ColorProps|string
    align?:FlexAlignType
    fd?:'flex-center'|'flex-justify'|'flex-item'|'flex-item-reverse'|'flex-between'|'flex-evenly'|'flex-between-reverse'|'flex-space'|'flex-row'|'flex-row-reverse'|'col-center'|'col-between'|'col-reverse'|'col-evenly'
    br?:number
    bc?:ColorProps|string
    bw?:number
    bbw?:number
    btw?:number
    blw?:number
    brw?:number
    brc?:ColorProps|string
    blc?:ColorProps|string
    btc?:ColorProps|string
    bbc?:ColorProps|string
    width?:number|string
    height?:number|string
    w?:number|string
    h?:number|string
    minW?:number
    maxW?:number
    minH?:number
    maxH?:number
    size?:number|any
    btrr?:number
    btlr?:number
    bbrr?:number
    bblr?:number
    bs?:"solid" | "dotted" | "dashed"
    shadow?:number
    wrap?:boolean
    overflow?:'visible' | 'hidden' | 'scroll'
    opacity?:number|any
    zIndex?:number,
    gap?:number
    children?:any
}

export type AnimatedProps = {
    scale?:any
    sx?:any
    sy?:any
    ty?:any
    tx?:any
}

export type SpacingProps = {
    padding?:number
    margin?:number
    p?:number
    m?:number
    ph?:number; pv?:number; px?:number; py?:number; pt?:number; pb?:number; pl?:number; pr?:number
    mh?:number; mv?:number; mx?:number; my?:number; mt?:number; mb?:number; ml?:number; mr?:number
}

export type PositionProps = {
    position?:'absolute'|'relative'
    absolute?:boolean
    inset?:number
    insetX?:number
    insetY?:number
    top?:number;bottom?:number;right?:number;left?:number|any;
}

export type CustomViewProps = Props&AnimatedProps&SpacingProps&PositionProps;

const View:React.FC<CustomViewProps> = React.forwardRef((props,ref: any)=>{
    const {colors} = useColor()

    const { componentProps } = useUIContext();
    const viewDefaults = componentProps.View || {};

    const {
        style,
        color,
        align,
        fd,
        flex,
        padding,p,
        margin,m,
        mt, mb, mh, ml, mr, mv, mx, my,
        pb, ph, pl, pv, pt, pr, px, py,
        width,w,
        height,h,
        br,
        bw,
        bbw,
        btw,
        bc,
        brc,
        blc,
        btc,
        bbc,
        btlr,
        btrr,
        bblr,
        bbrr,
        blw,
        brw,
        shadow,
        wrap,
        position,
        absolute,
        inset,
        insetX,
        insetY,
        top,
        right,
        bottom,
        left,
        overflow,
        size,
        opacity,
        zIndex,
        children,
        gap,
        scale,
        ty,tx,sx,sy,
        maxW,
        minW,
        minH,
        maxH,
        bs,
        ...otherProps
    } = props;

    let positionProps = {
        position,
        top,
        right,
        bottom,
        left,
    }

    if (top || right || bottom || left || absolute) {
        positionProps.position = "absolute"
    }

    let flexDirection = {};
    if (fd==="flex-center"){
        flexDirection = {
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"center",
        }
    }
    else if (fd==="col-center"){
        flexDirection = {
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
        }
    }
    else if (fd==="col-between"){
        flexDirection = {
            flexDirection:"column",
            // alignItems:"center",
            justifyContent:"space-between",
        }
    }
    else if (fd==="col-evenly"){
        flexDirection = {
            flexDirection:"column",
            // alignItems:"center",
            justifyContent:"space-evenly",
        }
    }
    else if (fd==="col-reverse"){
        flexDirection = {
            flexDirection:"column-reverse",
        }
    }

    if (fd==="flex-row"){
        flexDirection = {
            flexDirection:"row",
        }
    }
    else if (fd==="flex-row-reverse"){
        flexDirection = {
            flexDirection:"row-reverse",
        }
    }
    else if (fd==="flex-justify"){
        flexDirection = {
            flexDirection:"row",
            justifyContent:"center",
        }
    }
    else if (fd==="flex-item") {
        flexDirection = {
            flexDirection:"row",
            alignItems:"center",
        }
    }
    else if (fd==="flex-item-reverse") {
        flexDirection = {
            flexDirection:"row-reverse",
            alignItems:"center",
        }
    }
    else if (fd==="flex-between") {
        flexDirection = {
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"space-between"
        }
    }
    else if (fd==="flex-evenly") {
        flexDirection = {
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"space-evenly"
        }
    }
    else if (fd==="flex-between-reverse") {
        flexDirection = {
            flexDirection:"row-reverse",
            alignItems:"center",
            justifyContent:"space-between"
        }
    }
    else if (fd==="flex-space") {
        flexDirection = {
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"space-evenly"
        }
    }

    if (insetY!==undefined){
        positionProps.position="absolute";
        positionProps.top = insetY
        positionProps.bottom = insetY
    }
    if (insetX!==undefined){
        positionProps.position="absolute";
        positionProps.right = insetX
        positionProps.left = insetX
    }

    if (inset!==undefined){
        positionProps = {
            position:"absolute",
            right:inset,
            left:inset,
            top:inset,
            bottom:inset
        }
    }

    const animated = scale||tx||ty||sx||sy||(opacity&&isNaN(opacity));
    const Comp = animated?Animated.View:Parent


    const transform = [];
    if(scale){
        transform.push({scale})
    }
    if(ty){
        transform.push({ translateY:ty })
    }
    if(tx){
        transform.push({ translateX:tx })
    }
    if(sx){
        transform.push({ scaleX:sx })
    }
    if(sy){
        transform.push({ scaleX:sy })
    }

    return (
        <Comp
            ref={ref}
            {...otherProps}
            style={[
                {
                    flex,
                    padding:padding||p,
                    margin:margin||m,
                    width:size||width||w,
                    height:size||height||h,
                    alignSelf:align,
                    backgroundColor:color?colors[color]?colors[color]:color:undefined,
                    ...flexDirection,
                    marginTop:mt,
                    marginBottom:mb,
                    marginRight:mr,
                    marginLeft:ml,
                    marginHorizontal:mh||mx,
                    marginVertical:mv||my,
                    paddingTop:pt,
                    paddingBottom:pb,
                    paddingVertical:pv||py,
                    paddingHorizontal:ph||px,
                    paddingLeft:pl,
                    paddingRight:pr,
                    borderRadius:br,
                    borderWidth:bw,
                    borderBottomWidth:bbw,
                    borderTopWidth:btw,
                    borderColor:bc?colors[bc]?colors[bc]:bc:undefined,
                    borderRightColor:brc?colors[brc]?colors[brc]:brc:undefined,
                    borderLeftColor:blc?colors[blc]?colors[blc]:blc:undefined,
                    borderTopColor:btc?colors[btc]?colors[btc]:btc:undefined,
                    borderBottomColor:bbc?colors[bbc]?colors[bbc]:bbc:undefined,
                    borderTopRightRadius:btrr,
                    borderTopLeftRadius:btlr,
                    borderBottomLeftRadius:bblr,
                    borderBottomRightRadius:bbrr,
                    borderLeftWidth:blw,
                    borderRightWidth:brw,
                    borderStyle:bs,
                    flexWrap:wrap?"wrap":undefined,
                    ...elevation(shadow||0),
                    position:positionProps.position,
                    top:positionProps.top,
                    right:positionProps.right,
                    bottom:positionProps.bottom,
                    left:positionProps.left,
                    overflow,
                    opacity,
                    zIndex,
                    maxWidth:maxW,
                    minWidth:minW,
                    minHeight:minH,
                    maxHeight:maxH,
                    gap
                },
                {
                    transform
                },
                style,
            ]}
        >
            {children}
        </Comp>
    );
});

export default View;
