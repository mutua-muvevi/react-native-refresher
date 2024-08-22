import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import EmptyState from "../../components/EmptyState";
import { getUserPost, signOut } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import InfoBox from "../../components/InfoBox";
import { router } from "expo-router";

const Profile = () => {
	const { user, setUser, setIsLoggedIn } = useGlobalContext();

	const { data: posts } = useAppwrite(() => getUserPost(user.$id));

	const logout = async () => {
		router.replace("/sign-in");

		await signOut();
		setUser(null);
		setIsLoggedIn(false);

	};

	return (
		<SafeAreaView className="bg-primary h-full">
			<FlatList
				data={posts}
				keyExtractor={(item) => item.$id}
				renderItem={({ item }) => <VideoCard video={item} />}
				ListHeaderComponent={() => (
					<View className="w-full justify-center items-center mt-6 mb-12 px-4">
						<TouchableOpacity
							className="w-full items-end mt-10"
							onPress={logout}
						>
							<Image
								source={icons.logout}
								resize="contain"
								className="w-6 h-6"
							/>
						</TouchableOpacity>
						<View className="w-16 h-16 border border-secondary-100 rounded-lg justify-center items-center">
							<Image
								source={{ uri: user?.avatar }}
								className="w-[90%] h-[90%] rounded-lg"
								resizeMode="cover"
							/>
						</View>

						<InfoBox
							title={user?.username}
							containerStyles="mt-5"
							titleStyles="text-lg"
						/>

						<View className="mt-5 flex-row">
							<InfoBox
								title={posts?.length || 0}
								subtitle="Posts"
								containerStyles="mr-10"
								titleStyles="text-xl"
							/>
							<InfoBox
								title={"1.2k"}
								subtitle="Followers"
								titleStyles="text-xl"
							/>
						</View>
					</View>
				)}
				ListEmptyComponent={() => (
					<EmptyState
						title="No videos found"
						subtitle="No video found for this query"
					/>
				)}
			/>

			<StatusBar backgroundColor="#161622" style="light" />
		</SafeAreaView>
	);
};

export default Profile;
