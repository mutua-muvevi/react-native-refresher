import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
	const { setUser, setIsLoggedIn } = useGlobalContext();
	const [form, setform] = useState({
		email: "",
		password: "",
	});
	const [isSubmiting, setIsSubmiting] = useState(false);

	const submit = async () => {
		if (!form.email || !form.password) {
			Alert.alert("Error", "Please fill all the fields");
		}

		setIsSubmiting(true);

		try {
			await signIn(form.email, form.password);

			const result = await getCurrentUser();

			setUser(result);

			setIsLoggedIn(true);

			router.replace("/home");
		} catch (error) {

			console.log(`Error while submitting register form : ${error}`);
			Alert.alert("Error", error.message);
			throw new Error(error);

		} finally {
			setIsSubmiting(false);
		}
	};

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView>
				<View className="w-full justify-center min-h-[85vh] px-4 my-6">
					<Image
						source={images.logo}
						resizeMode="contain"
						className="w-[115px] h-[35px"
					/>
					<Text className="text-2xl text-white text-semibold mt-8 font-psemibold">
						Log in to JSM
					</Text>

					<FormField
						title="Email"
						value={form.email}
						handleChangeText={(event) =>
							setform({ ...form, email: event })
						}
						otherStyles="mt-7"
						keyboardType="email-address"
					/>

					<FormField
						title="Password"
						value={form.password}
						handleChangeText={(event) =>
							setform({ ...form, password: event })
						}
						otherStyles="mt-7"
					/>

					<CustomButton
						title="sign in"
						handlePress={submit}
						containerStyles="mt-7"
						isLoading={isSubmiting}
					/>

					<View className="justify-center pt-5 flex-row gap-2">
						<Text className="text-lg text-gray-100 font-pregular">
							Dont have an account
						</Text>
						<Link href="/sign-up">
							<Text className="text-lg text-secondary-200 font-pregular">
								Sign up
							</Text>
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignIn;
