import { View, Text } from "react-native";
import React from "react";

const InfoBox = ({ title, subtitle, titleStyles, containerStyles }) => {
	return (
		<View className={containerStyles} >
			<Text className={`text-white text-center font-psemibold ${titleStyles}`}>{title}</Text>
			<Text className={`text-gray-100 text-sm font-pregular text-center`} >{subtitle}</Text>
		</View>
	);
};

export default InfoBox;
