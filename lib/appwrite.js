import {
	Client,
	Account,
	ID,
	Avatars,
	Databases,
	Query,
} from "react-native-appwrite";

// we will put it in env variables
export const appwriteConfig = {
	endpoint: "https://cloud.appwrite.io/v1",
	platform: "com.jsm.jsm",
	projectId: "66c2de1b0022604571d8",
	databaseId: "66c2df92002138c4629b",
	userCollectionId: "66c2dfb9002e2ce75236",
	videoCollectionId: "66c2dffe00182f9bc8c3",
	storageId: "66c2e1f20000de401a6e",
};
// Init your React Native SDK
const client = new Client();

client
	.setEndpoint(appwriteConfig.endpoint)
	.setProject(appwriteConfig.projectId)
	.setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export const createUser = async (email, password, username) => {
	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			username
		);

		if (!newAccount) throw Error;

		const avatarUrl = avatars.getInitials(username);
		await signIn(email, password);

		// creating the user in the database
		const newUser = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			ID.unique(),
			{
				accountId: newAccount.$id,
				email,
				username,
				avatar: avatarUrl,
			}
		);

		return newUser;
	} catch (error) {
		console.log(`Error while registering account : ${error}`);
		throw new Error(error);
	}
};

//sign in user
export const signIn = async (email, password) => {
	try {
		const session = await account.createEmailPasswordSession(
			email,
			password
		);

		return session;
	} catch (error) {
		console.log(`Error while signing in user : ${error}`);
		throw new Error(error);
	}
};

//sign out user
export const signOut = async () => {
	try {
		const session = await account.deleteSession("current");

		return session
	} catch (error) {
		console.log("ERror", error)
		throw new Error(error)
	}
}

export const getCurrentUser = async () => {
	try {
		const currentAccount = await account.get();

		if (!currentAccount) throw Error;

		const currentUser = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			[Query.equal("accountId", currentAccount.$id)]
		);

		if (!currentUser) throw Error;

		return currentUser.documents[0];
	} catch (error) {
		console.log(error);
	}
};

// fetch post
export const getAllPost = async () => {
	try {
		const post = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.videoCollectionId
		);

		return post.documents;
	} catch (error) {
		throw new Error(error);
	}
};

//fetch latest post
export const getLatestPost = async () => {
	try {
		const post = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.videoCollectionId,
			[Query.orderDesc("$createdAt", Query.limit(7))]
		);

		return post.documents;
	} catch (error) {
		throw new Error(error);
	}
};

//fetch latest post
export const searchPost = async (query) => {
	try {
		const posts = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.videoCollectionId,
			[Query.search("title", query)]
		);

		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
};

//fetch latest post
export const getUserPost = async (userID) => {
	try {
		const posts = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.videoCollectionId,
			[Query.equal("creator", [userID])]
		);

		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
};
