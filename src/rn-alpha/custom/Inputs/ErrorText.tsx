import React from 'react';
import Text from "../../default/Text";
import inputConfig from "./InputConfig";

export type ErrorTextProps = {
	error:any
}

const ErrorText: React.FC<ErrorTextProps> = ({error}) => {
	return (
	    <Text
		    size={inputConfig.helper.size}
		    color={"danger"}
		    mt={inputConfig.helper.spacingTop}
			ml={inputConfig.helper.spacingLeft}
	    >
		    {error}
	    </Text>
    );
};

export default ErrorText;
