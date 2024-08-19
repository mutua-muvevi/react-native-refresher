import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";

const SignUp = () => {
	const [form, setform] = useState({
		username: "",
		email: "",
		password: ""
	});
	const [isSubmiting, setIsSubmiting] = useState(false);

	const submit = () => {}

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView>
				<View className="w-full justify-center min-h-[85vh] px-4 my-6">
					<Image
						source={images.logo}
						resizeMode="contain"
						className="w-[115px] h-[35px]"
					/>
					<Text className="text-2xl text-white text-semibold mt-8 font-psemibold">
						Sign up to JSM
					</Text>

					<FormField
						title="Username"
						value={form.username}
						handleChangeText={(event) => setform({ ...form, username: event })}
						otherStyles="mt-10"
						placeholder="Enter your username"
					/>

					<FormField
						title="Email"
						value={form.email}
						handleChangeText={(event) => setform({ ...form, email: event })}
						otherStyles="mt-7"
						keyboardType="email-address"
						placeholder="Enter your email"
					/>

					<FormField
						title="Password"
						value={form.password}
						handleChangeText={(event) => setform({ ...form, password: event })}
						otherStyles="mt-7"
					/>

					<CustomButton
						title="sign up"
						handlePress={submit}
						containerStyles="mt-7"
						isLoading={isSubmiting}
					/>

					<View className="justify-center pt-5 flex-row gap-2">
						<Text className="text-lg text-gray-100 font-pregular">
							Already have an account
						</Text>
						<Link href="/sign-in">
							<Text className="text-lg text-secondary-200 font-pregular">
								Sign in
							</Text>
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignUp;
