import {
	View,
	Text,
	FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { searchPost } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
	const [refreshing, setRefreshing] = useState(false);
	const { query } = useLocalSearchParams();

	const { data: posts, refetchData } = useAppwrite(() =>  searchPost(query));

	useEffect(() => {
		refetchData();
	}, [query]);

	return (
		<SafeAreaView className="bg-primary h-full">
			<FlatList
				data={posts}
				keyExtractor={(item) => item.$id}
				renderItem={({ item }) => <VideoCard video={item} />}
				ListHeaderComponent={() => (
					<View className="my-6 px-4 ">
						<Text className="font-pmedium text-sm text-gray-100 ">
							Search Results
						</Text>
						<Text className="text-2xl font-psemibold text-white">
							{query}
						</Text>

						<View className="mt-6 mb-8">
							<SearchInput initialQuery={query} />
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

export default Search;
