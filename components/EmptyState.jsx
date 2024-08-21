import { View, Text, Image } from "react-native";
import { images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }) => {
	return (
		<View className="justify-center items-center px-4">
			<Image source={images.empty} className="w-[270px] h-[215px]" />
			
			<Text className="text-xl font-psemibold text-white text-center mt-2">
				{title}
			</Text>
				
			<Text className="font-pmedium text-sm text-gray-100 ">{subtitle}</Text>

			<CustomButton
				title="Create Video"
				handlePress={() => router.push("/create")}
				containerStyles="w-full my-5"
			/>
		</View>
	);
};

export default EmptyState;
