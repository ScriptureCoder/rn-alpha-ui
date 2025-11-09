import React from 'react';
import {ImageSourcePropType} from "react-native";
import {ColorProps} from "constants/colors";
import {PositionProps} from "./View";
import useColor from "../../hooks/use-color";
import { View } from "../index";
import FastImage from '@d11/react-native-fast-image'

export interface CustomImageProps extends React.ComponentProps< typeof FastImage> {
    w?:number
    h?:number
    br?:number
    bc?:ColorProps|string
    bw?:number
    size?:number
    flex?:number
    opacity?:number
    source:ImageSourcePropType|any
    color?:ColorProps|string
    resizeMode?: 'cover' | 'contain' | 'stretch' | 'center'
    fallbackSource?:ImageSourcePropType
    onError?:() => void
    onLoad?:() => void
}

const Image: React.FC<CustomImageProps&PositionProps> = (props) => {
    const {colors} = useColor()
    const {
        w,h,
        br,
        size,
        style,
        flex,
        color,
        position,
        inset,
        insetX,
        insetY,
        top,
        right,
        bottom,
        left,
        opacity,
        source,
        bw,bc,
        resizeMode="cover",
        fallbackSource,
        onError,
        onLoad,
        ...otherProps
    } = props;



    let positionProps = {
        position,
        top,
        right,
        bottom,
        left,
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

    const baseStyle = [
        {
            flex,
            width:size||w,
            height:size||h,
            borderRadius:br,
            backgroundColor:color?colors[color as ColorProps]?colors[color as ColorProps]:color:undefined,
            position:positionProps.position,
            top:positionProps.top,
            right:positionProps.right,
            bottom:positionProps.bottom,
            left:positionProps.left,
            borderColor:bc?colors[bc as ColorProps]?colors[bc as ColorProps]:bc:undefined,
            borderWidth:bw,
            opacity
        },
        style
    ]

    // Helper function to get FastImage resizeMode
    const getFastImageResizeMode = (mode: string) => {
        switch (mode) {
            case 'cover':
                return FastImage.resizeMode.cover;
            case 'contain':
                return FastImage.resizeMode.contain;
            case 'stretch':
                return FastImage.resizeMode.stretch;
            case 'center':
                return FastImage.resizeMode.center;
            default:
                return FastImage.resizeMode.cover;
        }
    };

    // Check if source is valid
    const isValidSource = (src: any) => {
        if (!src) return false;
        if (typeof src === 'object' && src.uri) {
            return src.uri && !src.uri.includes('undefined') && src.uri.trim() !== '';
        }
        return true;
    };

    const handleError = () => {
        if (onError) {
            onError();
        }
    };

    const handleLoad = () => {
        if (onLoad) {
            onLoad();
        }
    };

    return (
      <>
          {
              source?.uri ?
                !isValidSource(source) ?
                  <View style={baseStyle} fd={"flex-center"}>
                      {/* Placeholder for invalid image */}
                  </View>:
                  <FastImage
                    {...otherProps}
                    source={{ uri: source.uri }}
                    style={baseStyle}
                    resizeMode={getFastImageResizeMode(resizeMode)}
                    onError={handleError}
                    onLoad={handleLoad}
                  />:
                <FastImage
                  {...otherProps}
                  source={source}
                  style={baseStyle}
                  resizeMode={getFastImageResizeMode(resizeMode)}
                  onError={handleError}
                  onLoad={handleLoad}
                />
          }
      </>
    );
};

export default Image;
