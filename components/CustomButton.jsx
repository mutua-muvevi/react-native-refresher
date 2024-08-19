import { TouchableOpacity, Text } from "react-native";
import React from "react";

const CustomButton = ({
	title,
	handlePress,
	containerStyles,
	textStyles,
	isLoading,
}) => {
	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.7}
			className={`bg-secondary rounded-lg min-h-[50px] items-center justify-center ${containerStyles} {isLoading ? "opacity-50" : ""}`}
			
		>
			<Text className={`text-primary font-pregular text-lg ${textStyles}`}>{title}</Text>
		</TouchableOpacity>
	);
};

export default CustomButton;
