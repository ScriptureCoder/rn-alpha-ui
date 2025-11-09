import React from 'react';
import {SkypeIndicator as Animate} from "react-native-indicators";
import View from '../default/View';
import Text from '../default/Text';
import useColor from "hooks/use-color.ts";

type Props = {
  text?:string
  loading:boolean
  color?:string
}

const Loader: React.FC<Props> = ({text,loading,color}) => {
  const {colors} = useColor()
  return (
      <>
        {loading&&(
            <View flex={1} fd={"col-center"} pv={25}>
              <Animate size={35} count={6} color={color||colors.primary}/>
              {text&&(
                  <Text size={15} mt={15} color={"text"}>{text}</Text>
              )}
            </View>
        )}
      </>
  );
};

export default Loader;
