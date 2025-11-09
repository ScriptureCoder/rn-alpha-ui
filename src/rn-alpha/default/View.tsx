import React, { useMemo, useCallback } from 'react';
import { Animated, FlexAlignType, View as Parent, ViewProps } from "react-native";
import { ColorProps } from "constants/colors";
import { elevation } from "constants/elevation";
import useColor from "hooks/use-color.ts";
import { useUIContext } from '../../theme/alpha-ui-context';

export interface CustomViewProps extends Omit<ViewProps, 'ref'> {
    flex?: number;
    color?: ColorProps | string;
    align?: FlexAlignType;
    fd?: 'flex-center' | 'flex-justify' | 'flex-item' | 'flex-between' | 'flex-space' | 'flex-evenly' | 'flex-row' | 'col-center' | 'col-between' | 'col-evenly' | 'col-reverse' | 'flex-start' | 'flex-end' | 'flex-stretch' | 'col-start' | 'col-end' | 'col-stretch' | 'col-around' | 'row-reverse' | 'flex-wrap' | 'col-wrap';
    br?: number;
    bc?: ColorProps | string;
    bw?: number;
    bbw?: number;
    btw?: number;
    blw?: number;
    brw?: number;
    brc?: ColorProps | string;
    blc?: ColorProps | string;
    btc?: ColorProps | string;
    bbc?: ColorProps | string;
    width?: number | string;
    height?: number | string;
    w?: number | string;
    h?: number | string;
    minW?: number | string;
    maxW?: number | string;
    minH?: number | string;
    maxH?: number | string;
    size?: number | string;
    btrr?: number;
    btlr?: number;
    bbrr?: number;
    bblr?: number;
    bs?: "solid" | "dotted" | "dashed";
    shadow?: number;
    wrap?: boolean;
    overflow?: 'visible' | 'hidden' | 'scroll';
    opacity?: number;
    zIndex?: number;
    gap?: number;
    children?: React.ReactNode;

    // New suggested props
    aspectRatio?: number;
    aspect?: 'square' | 'video' | 'golden' | 'portrait' | 'landscape';
    fullWidth?: boolean;
    fullHeight?: boolean;
    screenWidth?: boolean;
    screenHeight?: boolean;
    center?: boolean;
    centerX?: boolean;
    centerY?: boolean;
    absolute?: boolean;
    relative?: boolean;
    fixed?: boolean;
    rounded?: boolean;
    roundedSm?: boolean;
    roundedLg?: boolean;
    roundedXl?: boolean;
    roundedFull?: boolean;
    elevated?: boolean;
    elevatedSm?: boolean;
    elevatedLg?: boolean;
    elevatedXl?: boolean;
    hidden?: boolean;
    visible?: boolean;
    disabled?: boolean;
}

export type AnimatedProps = {
    scale?: number;
    sx?: number;
    sy?: number;
    ty?: number;
    tx?: number;
    rotate?: number;
    skewX?: number;
    skewY?: number;
    perspective?: number;
}

export type SpacingProps = {
    padding?: number;
    margin?: number;
    p?: number;
    m?: number;
    ph?: number; pv?: number; pt?: number; pb?: number; pl?: number; pr?: number;
    mh?: number; mv?: number; mt?: number; mb?: number; ml?: number; mr?: number;
    px?: number; py?: number;
    space?: number;
    spaceX?: number;
    spaceY?: number;
}

export type PositionProps = {
    position?: 'absolute' | 'relative';
    inset?: number;
    insetX?: number;
    insetY?: number;
    top?: number; bottom?: number; right?: number; left?: number;
}

type Props = CustomViewProps & AnimatedProps & SpacingProps & PositionProps;

// Flex direction mapping for better performance
const FLEX_DIRECTIONS = {
    'flex-center': {
        flexDirection: "row" as const,
        alignItems: "center" as const,
        justifyContent: "center" as const,
    },
    'col-center': {
        flexDirection: "column" as const,
        alignItems: "center" as const,
        justifyContent: "center" as const,
    },
    'col-between': {
        flexDirection: "column" as const,
        justifyContent: "space-between" as const,
    },
    'col-evenly': {
        flexDirection: "column" as const,
        justifyContent: "space-evenly" as const,
    },
    'col-reverse': {
        flexDirection: "column-reverse" as const,
    },
    'flex-row': {
        flexDirection: "row" as const,
    },
    'flex-justify': {
        flexDirection: "row" as const,
        justifyContent: "center" as const,
    },
    'flex-item': {
        flexDirection: "row" as const,
        alignItems: "center" as const,
    },
    'flex-between': {
        flexDirection: "row" as const,
        alignItems: "center" as const,
        justifyContent: "space-between" as const,
    },
    'flex-space': {
        flexDirection: "row" as const,
        alignItems: "center" as const,
        justifyContent: "space-evenly" as const,
    },
    'flex-evenly': {
        flexDirection: "row" as const,
        alignItems: "center" as const,
        justifyContent: "space-evenly" as const,
    },
    // New flex directions
    'flex-start': {
        flexDirection: "row" as const,
        alignItems: "flex-start" as const,
    },
    'flex-end': {
        flexDirection: "row" as const,
        alignItems: "flex-end" as const,
    },
    'flex-stretch': {
        flexDirection: "row" as const,
        alignItems: "stretch" as const,
    },
    'col-start': {
        flexDirection: "column" as const,
        alignItems: "flex-start" as const,
    },
    'col-end': {
        flexDirection: "column" as const,
        alignItems: "flex-end" as const,
    },
    'col-stretch': {
        flexDirection: "column" as const,
        alignItems: "stretch" as const,
    },
    'col-around': {
        flexDirection: "column" as const,
        justifyContent: "space-around" as const,
    },
    'row-reverse': {
        flexDirection: "row-reverse" as const,
    },
    'flex-wrap': {
        flexDirection: "row" as const,
        flexWrap: "wrap" as const,
    },
    'col-wrap': {
        flexDirection: "column" as const,
        flexWrap: "wrap" as const,
    },
} as const;

// Aspect ratio presets
const ASPECT_RATIOS = {
    square: 1,
    video: 16/9,
    golden: 1.618,
    portrait: 3/4,
    landscape: 4/3,
} as const;

const View = React.forwardRef<Parent, Props>((props, ref) => {
    const { colors } = useColor();
    const { componentProps } = useUIContext();
    const viewDefaults = componentProps.View || {};

    const mergedProps = {
        ...viewDefaults,
        ...props,
    };

    const {
        style,
        color,
        align,
        fd,
        flex,
        padding, p,
        margin, m,
        mt, mb, mh, ml, mr, mv,
        pb, ph, pl, pv, pt, pr,
        px, py,
        width, w,
        height, h,
        br,
        bw, bbw, btw, blw, brw,
        bc, brc, blc, btc, bbc,
        btlr, btrr, bblr, bbrr,
        shadow,
        wrap,
        position,
        inset, insetX, insetY,
        top, right, bottom, left,
        overflow,
        size,
        opacity,
        zIndex,
        children,
        gap,
        scale, ty, tx, sx, sy,
        maxW, minW, minH, maxH,
        bs,
        // New props
        aspectRatio, aspect,
        fullWidth, fullHeight, screenWidth, screenHeight,
        center, centerX, centerY,
        absolute, relative, fixed,
        rounded, roundedSm, roundedLg, roundedXl, roundedFull,
        elevated, elevatedSm, elevatedLg, elevatedXl,
        hidden, visible, disabled,
        rotate, skewX, skewY, perspective,
        space, spaceX, spaceY,
        ...otherProps
    } = mergedProps;

    // Memoized color resolver for better performance
    const resolveColor = useCallback((colorValue?: ColorProps | string) => {
        if (!colorValue) return undefined;
        return colors[colorValue as ColorProps] || colorValue;
    }, [colors]);

    // Memoized style calculation for better performance
    const computedStyle = useMemo(() => {

        // Position props calculation
        // Auto-set position absolute when top/right/bottom/left are defined
        let autoPosition = position;
        if (!autoPosition && (top !== undefined || right !== undefined || bottom !== undefined || left !== undefined)) {
            autoPosition = "absolute";
        }
        
        let positionProps: any = { position: autoPosition, top, right, bottom, left };

        // Apply inset shortcuts only if individual properties are not set
        if (insetY !== undefined) {
            positionProps.position = "absolute";
            if (top === undefined) positionProps.top = insetY;
            if (bottom === undefined) positionProps.bottom = insetY;
        }
        if (insetX !== undefined) {
            positionProps.position = "absolute";
            if (left === undefined) positionProps.left = insetX;
            if (right === undefined) positionProps.right = insetX;
        }
        if (inset !== undefined) {
            positionProps.position = "absolute";
            if (top === undefined) positionProps.top = inset;
            if (right === undefined) positionProps.right = inset;
            if (bottom === undefined) positionProps.bottom = inset;
            if (left === undefined) positionProps.left = inset;
        }

        // Handle aspect ratio
        let finalAspectRatio = aspectRatio;
        if (aspect && ASPECT_RATIOS[aspect]) {
            finalAspectRatio = ASPECT_RATIOS[aspect];
        }

        // Handle width/height shortcuts
        let finalWidth = size ?? width ?? w;
        let finalHeight = size ?? height ?? h;

        if (fullWidth) finalWidth = '100%';
        if (fullHeight) finalHeight = '100%';
        if (screenWidth) finalWidth = '100vw';
        if (screenHeight) finalHeight = '100vh';

        // Handle border radius shortcuts
        let finalBorderRadius = br;
        if (rounded) finalBorderRadius = 4;
        if (roundedSm) finalBorderRadius = 2;
        if (roundedLg) finalBorderRadius = 8;
        if (roundedXl) finalBorderRadius = 12;
        if (roundedFull) finalBorderRadius = 9999;

        // Handle shadow shortcuts
        let finalShadow = shadow;
        if (elevated) finalShadow = 2;
        if (elevatedSm) finalShadow = 1;
        if (elevatedLg) finalShadow = 4;
        if (elevatedXl) finalShadow = 8;

        // Handle position shortcuts
        let finalPosition = position;
        if (absolute) finalPosition = 'absolute';
        if (relative) finalPosition = 'relative';
        if (fixed) finalPosition = 'absolute'; // React Native doesn't have fixed

        // Handle center shortcuts
        let centerStyles = {};
        if (center) {
            centerStyles = { alignItems: 'center', justifyContent: 'center' };
        } else {
            if (centerX) centerStyles = { ...centerStyles, alignItems: 'center' };
            if (centerY) centerStyles = { ...centerStyles, justifyContent: 'center' };
        }

        // Handle spacing shortcuts
        let finalPadding = padding ?? p;
        let finalMargin = margin ?? m;
        if (space !== undefined) {
            finalPadding = space;
            finalMargin = space;
        }
        if (spaceX !== undefined) {
            finalPadding = spaceX;
            finalMargin = spaceX;
        }
        if (spaceY !== undefined) {
            finalPadding = spaceY;
            finalMargin = spaceY;
        }

        // Transform array for animations
        const transform = [];
        if (scale) transform.push({ scale });
        if (ty) transform.push({ translateY: ty });
        if (tx) transform.push({ translateX: tx });
        if (sx) transform.push({ scaleX: sx });
        if (sy) transform.push({ scaleY: sy });
        if (rotate) transform.push({ rotate: `${rotate}deg` });
        if (skewX) transform.push({ skewX: `${skewX}deg` });
        if (skewY) transform.push({ skewY: `${skewY}deg` });

        // Handle visibility
        let finalOpacity = opacity;
        let pointerEvents: any = undefined;
        if (hidden) {
            finalOpacity = 0;
            pointerEvents = 'none';
        }
        if (visible) {
            finalOpacity = 1;
        }
        if (disabled) {
            finalOpacity = 0.5;
            pointerEvents = 'none';
        }

        return {
            flex,
            padding: finalPadding,
            margin: finalMargin,
            width: finalWidth,
            height: finalHeight,
            aspectRatio: finalAspectRatio,
            alignSelf: align,
            backgroundColor: resolveColor(color),
            ...(fd ? FLEX_DIRECTIONS[fd] : {}),
            ...centerStyles,
            marginTop: mt,
            marginBottom: mb,
            marginRight: mr,
            marginLeft: ml,
            marginHorizontal: mh,
            marginVertical: mv,
            paddingTop: pt,
            paddingBottom: pb,
            paddingVertical: pv ?? py,
            paddingHorizontal: ph ?? px,
            paddingLeft: pl,
            paddingRight: pr,
            borderRadius: finalBorderRadius,
            borderWidth: bw,
            borderBottomWidth: bbw,
            borderTopWidth: btw,
            borderColor: resolveColor(bc),
            borderRightColor: resolveColor(brc),
            borderLeftColor: resolveColor(blc),
            borderTopColor: resolveColor(btc),
            borderBottomColor: resolveColor(bbc),
            borderTopRightRadius: btrr,
            borderTopLeftRadius: btlr,
            borderBottomLeftRadius: bblr,
            borderBottomRightRadius: bbrr,
            borderLeftWidth: blw,
            borderRightWidth: brw,
            borderStyle: bs,
            flexWrap: wrap ? "wrap" : undefined,
            ...elevation(finalShadow ?? 0),
            position: finalPosition,
            ...positionProps,
            overflow,
            opacity: finalOpacity,
            zIndex,
            maxWidth: maxW,
            minWidth: minW,
            minHeight: minH,
            maxHeight: maxH,
            gap,
            transform: transform.length > 0 ? transform : undefined,
            pointerEvents,
            perspective,
        };
    }, [
        flex, padding, p, margin, m, mt, mb, mh, ml, mr, mv,
        pb, ph, pl, pv, pt, pr, px, py,
        width, w, height, h, size,
        align, color, fd, br, bw, bbw, btw, blw, brw,
        bc, brc, blc, btc, bbc, btlr, btrr, bblr, bbrr,
        shadow, wrap, position, inset, insetX, insetY,
        top, right, bottom, left, overflow, opacity, zIndex,
        gap, scale, ty, tx, sx, sy, maxW, minW, minH, maxH, bs,
        aspectRatio, aspect, fullWidth, fullHeight, screenWidth, screenHeight,
        center, centerX, centerY, absolute, relative, fixed,
        rounded, roundedSm, roundedLg, roundedXl, roundedFull,
        elevated, elevatedSm, elevatedLg, elevatedXl,
        hidden, visible, disabled, rotate, skewX, skewY, perspective,
        space, spaceX, spaceY,
        resolveColor
    ]);

    // Determine if we need Animated.View
    const needsAnimation = scale || tx || ty || sx || sy || (opacity !== undefined && typeof opacity === 'number');
    const Comp = needsAnimation ? Animated.View : Parent;

    return (
        <Comp
            ref={ref}
            {...otherProps}
            style={[computedStyle, style]}
        >
            {children}
        </Comp>
    );
});

View.displayName = 'View';

export default View;
