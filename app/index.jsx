import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import { Image } from "react-native";

export default function App() {
	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView contentContainerStyle={{ height: "100%" }}>
				<View className="w-full justify-center items-center h-full px-4">
					<Image
						source={images.logo}
						className="w-[130px] h-[130px]"
						resizeMode="contain"
						/>

					<Image
						source={images.cards}
						className="max-w-[380px] w-full h-[300px]"
						resizeMode="contain"
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

