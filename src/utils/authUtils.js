import { auth } from "../apis/firebase";
export const matchStrings = (string1, string2) => {
	let stringsMatch = false;

	if (string1 === string2) {
		stringsMatch = true;
	}

	return stringsMatch;
};

export const getUserToken = async () => {
	let userToken = { success: false, token: "" };
	try {
		const tokenResponse = await auth.currentUser.getIdToken(true);
		userToken = { success: true, token: tokenResponse };
	} catch (error) {
		userToken = { success: false, token: "" };
	}
	return userToken;
};
