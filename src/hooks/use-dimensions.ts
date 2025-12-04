import {useWindowDimensions} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const useDimensions = () => {
    const { width, height } = useWindowDimensions()
    const insets = useSafeAreaInsets()

    return {
        width, height,
        isBigDevice: width > 500,
        isSmallDevice: width < 375,
        ...insets
    }
}

export default useDimensions;
