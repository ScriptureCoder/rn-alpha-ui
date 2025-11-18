import React, { useMemo } from 'react';
import { StyleProp, TextProps, Text as Char, TextStyle, PixelRatio, Dimensions } from 'react-native';
import { ColorProps } from "constants/colors.ts";
import useColor from "hooks/use-color.ts";
import useDimensions from "hooks/use-dimensions.ts";
import { Weight } from 'types';
import { useUIContext } from '../../theme/alpha-ui-context';

export type SpacingProps = {
    padding?: number;
    margin?: number;
    p?: number;
    m?: number;
    ph?: number; pv?: number; pt?: number; pb?: number; pl?: number; pr?: number;
    mh?: number; mv?: number; mt?: number; mb?: number; ml?: number; mr?: number;
    px?: number; py?: number;
}

export type Alignment = 'right' | 'left' | 'center' | 'justify' | 'auto';
export type TypographyProps = {
    color?: ColorProps | string;
    align?: Alignment
    size?: number;
    weight?: Weight;
    lineHeight?: number;
    letterSpacing?: number;
    tt?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
    td?: "none" | "underline" | "line-through" | "underline line-through";
    fontFamily?: string;
    fontStyle?: 'normal' | 'italic';
    textShadow?: {
        color?: string;
        offset?: { width: number; height: number };
        radius?: number;
    };
    numberOfLines?: number;
    ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
    selectable?: boolean;
    adjustsFontSizeToFit?: boolean;
    minimumFontScale?: number;
    maxFontSizeMultiplier?: number;
    allowFontScaling?: boolean;
}

export type AnimationProps = {
    opacity?: number;
    scale?: number;
    rotate?: number;
    translateX?: number;
    translateY?: number;
}

export type AdaptiveProps = {
    adaptiveSize?: boolean;
    referenceWidth?: number;
    minSize?: number;
    maxSize?: number;
}

export type Props = TextProps & SpacingProps & TypographyProps & AnimationProps & AdaptiveProps;

const Text: React.FC<Props> = React.forwardRef<Char, Props>((props, ref) => {
    const { colors } = useColor();
    const { componentProps, fontFamily: contextFontFamily } = useUIContext();
    const { width, isSmallDevice, isBigDevice } = useDimensions();
    const textDefaults = componentProps.Text || {};

    const mergedProps = {
        ...textDefaults,
        ...props,
    } as Props;

    const {
        style,
        color = "text",
        align,
        size,
        weight,
        lineHeight,
        letterSpacing,
        tt,
        td,
        fontFamily,
        fontStyle,
        textShadow,
        numberOfLines,
        ellipsizeMode,
        selectable,
        adjustsFontSizeToFit,
        minimumFontScale,
        maxFontSizeMultiplier,
        allowFontScaling,
        // Adaptive props
        adaptiveSize = false,
        referenceWidth = 375,
        minSize = 12,
        maxSize = 32,
        // Spacing props
        padding, p,
        margin, m,
        mt, mb, mh, ml, mr, mv,
        pb, ph, pl, pv, pt, pr,
        px, py,
        // Animation props
        opacity,
        scale,
        rotate,
        translateX,
        translateY,
        ...restProps
    } = mergedProps;

    // Memoized style calculation for better performance
    const computedStyle = useMemo(() => {
        // Helper function to resolve colors
        const resolveColor = (colorValue?: ColorProps | string) => {
            if (!colorValue) return undefined;
            return colors[colorValue as ColorProps] || colorValue;
        };

        // Helper function to calculate adaptive font size using normalized scaling
        const getAdaptiveFontSize = (fontSize?: number) => {
            if (!adaptiveSize || !fontSize) return fontSize;

            // Calculate scale factor based on reference width (iPhone 11 width ~375)
            const scale = width / referenceWidth;

            // Apply scaling with PixelRatio for pixel-perfect rendering
            const scaledSize = fontSize * scale;
            const normalizedSize = PixelRatio.roundToNearestPixel(scaledSize);

            // Apply device-specific adjustments (optional)
            let adjustedSize = normalizedSize;
            if (isSmallDevice) {
                adjustedSize *= 0.95; // Slightly smaller on small devices
            } else if (isBigDevice) {
                adjustedSize *= 1.05; // Slightly larger on large devices
            }

            // Clamp between min and max values
            return Math.max(minSize, Math.min(maxSize, adjustedSize));
        };

        // Handle spacing shortcuts
        let finalPadding = padding ?? p;
        let finalMargin = margin ?? m;

        // Transform array for animations
        const transform = [];
        if (scale) transform.push({ scale });
        if (translateX) transform.push({ translateX });
        if (translateY) transform.push({ translateY });
        if (rotate) transform.push({ rotate: `${rotate}deg` });

        // Configurable font family mapping from context
        // If base is provided, generate weight variants automatically
        // Otherwise, use explicit values or fallback to defaults
        const getFontFamily = (weight: Weight): string => {
            const baseFont = contextFontFamily.base;
            const customFont = contextFontFamily.custom;
            const weightMap: Record<Weight, string> = {
                Regular: 'Regular',
                Bold: 'Bold',
                SemiBold: 'SemiBold',
                Light: 'Light',
                Medium: 'Medium',
                ExtraLight: 'ExtraLight',
                Italic: 'Italic',
                ExtraBold: 'ExtraBold',
                Custom: 'Custom',
            };

            // Handle custom font family
            if (weight === 'Custom' && customFont) {
                return customFont;
            }

            // If base font is provided, generate the font family name
            if (baseFont) {
                return `${baseFont}-${weightMap[weight]}`;
            }

            // Otherwise, use explicit values or fallback to defaults
            const explicitValues: Record<Weight, string | undefined> = {
                Regular: contextFontFamily.regular,
                Bold: contextFontFamily.bold,
                SemiBold: contextFontFamily.semiBold,
                Light: contextFontFamily.light,
                Medium: contextFontFamily.medium,
                ExtraLight: contextFontFamily.extraLight,
                Italic: contextFontFamily.italic,
                ExtraBold: contextFontFamily.extraBold,
                Custom: contextFontFamily.custom,
            };

            return explicitValues[weight] || `NunitoSans-${weightMap[weight]}`;
        };

        const fontFamilies: Record<Weight, string> = {
            Regular: getFontFamily('Regular'),
            Bold: getFontFamily('Bold'),
            SemiBold: getFontFamily('SemiBold'),
            Light: getFontFamily('Light'),
            Medium: getFontFamily('Medium'),
            ExtraLight: getFontFamily('ExtraLight'),
            Italic: getFontFamily('Italic'),
            ExtraBold: getFontFamily('ExtraBold'),
            Custom: getFontFamily('Custom'),
        };

        const resolvedWeight = weight ?? 'Regular';
        const resolvedFontFamily =
            fontFamily ||
            (resolvedWeight ? fontFamilies[resolvedWeight] ?? fontFamilies.Regular : fontFamilies.Regular);

        // Determine the font size to use (adaptive or regular)
        const fontSizeToUse = adaptiveSize ? getAdaptiveFontSize(size) : size;

        // Create base text style
        const textStyle: TextStyle = {
            fontFamily: resolvedFontFamily,
            color: resolveColor(color),
            textAlign: align,
            fontSize: fontSizeToUse,
            lineHeight,
            letterSpacing,
            textTransform: tt,
            textDecorationLine: td,
            fontStyle,
            textShadowColor: textShadow?.color,
            textShadowOffset: textShadow?.offset,
            textShadowRadius: textShadow?.radius,
        };

        // Create layout style (separate from text style)
        const layoutStyle = {
            // Spacing
            padding: finalPadding,
            margin: finalMargin,
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
            opacity,
            transform: transform.length > 0 ? transform : undefined,
        };

        return {
            text: textStyle,
            layout: layoutStyle,
        };
    }, [
        color, align, size, weight, lineHeight, letterSpacing, tt, td,
        fontFamily, fontStyle, textShadow, opacity, scale, rotate,
        translateX, translateY,
        padding, p, margin, m, mt, mb, mh, ml, mr, mv,
        pb, ph, pl, pv, pt, pr, px, py,
        adaptiveSize, referenceWidth, minSize, maxSize,
        width, isSmallDevice, isBigDevice,
        colors, contextFontFamily,
    ]);

    const { text: textStyle, layout: layoutStyle } = computedStyle;

    const styleLayers = (
        [
            textStyle,
            layoutStyle,
            style,
        ] as Array<StyleProp<TextStyle> | undefined>
    ).filter(Boolean) as StyleProp<TextStyle>[];

    return (
        <Char
            ref={ref}
            allowFontScaling={allowFontScaling}
            adjustsFontSizeToFit={adjustsFontSizeToFit}
            ellipsizeMode={ellipsizeMode}
            maxFontSizeMultiplier={maxFontSizeMultiplier}
            minimumFontScale={minimumFontScale}
            numberOfLines={numberOfLines}
            selectable={selectable}
            {...restProps}
            style={styleLayers as StyleProp<TextStyle>}
        />
    );
});

export default Text;
