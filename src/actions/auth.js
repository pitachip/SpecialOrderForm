import { auth, guestAuth, authProvider } from "../apis/firebase";
import pitachip from "../apis/pitachip";
import { getUserToken } from "../utils/authUtils";

export const signInWithEmailAndPassword = (email, password) => async (
	dispatch
) => {
	try {
		let metaData = {};

		const signInAttempt = await auth.signInWithEmailAndPassword(
			email,
			password
		);

		if (signInAttempt) {
			const userToken = await getUserToken();
			const userMetaData = await pitachip.get(
				`/user/${signInAttempt.user.uid}`,
				{
					headers: { Authorization: `Bearer ${userToken.token}` },
				}
			);
			metaData = userMetaData.data[0].metaData;
		}
		dispatch({
			type: "SET_USER",
			payload: {
				user: signInAttempt.user,
				metaData: metaData,
				authLoading: false,
				message: "",
				showAuthMessage: false,
				authMessageVariant: null,
			},
		});
	} catch (error) {
		const errorMessage = createErrorMessage(error.code);
		dispatch({
			type: "SET_AUTH_MESSAGE",
			payload: {
				message: errorMessage,
				showAuthMessage: true,
				authMessageVariant: "danger",
			},
		});
	}
};

export const signInGuestUser = () => async (dispatch) => {
	try {
		const guestSignInAttempt = await auth.signInAnonymously();
		const userToken = await getUserToken();
		const saveGuestUser = await pitachip.post(
			"/user",
			{
				isAnonymous: true,
				metaData: {
					firstName: "",
					lastName: "",
					email: "",
				},
			},
			{
				headers: { Authorization: `Bearer ${userToken.token}` },
			}
		);
		dispatch({
			type: "SET_USER",
			payload: {
				user: guestSignInAttempt,
				metaData: saveGuestUser.data.metaData,
				authLoading: false,
				errorMessage: "",
				showAuthErrorMessage: false,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

export const createUserAccount = (
	firstName,
	lastName,
	email,
	password
) => async (dispatch) => {
	try {
		const createUser = await pitachip.post("/auth/register", {
			firstName,
			lastName,
			email,
			password,
			role: {
				customer: true,
				employee: false,
				manager: false,
				admin: false,
			},
		});

		/**
		 * Sign in with custom token to create a handle to the
		 * onAuthStateChanged listener.
		 */
		await auth.signInWithCustomToken(createUser.token);

		dispatch({
			type: "SET_USER",
			payload: {
				user: createUser.user,
				metaData: createUser.metaData,
				authLoading: false,
				errorMessage: "",
				showAuthErrorMessage: false,
			},
		});
	} catch (error) {
		dispatch({
			type: "SET_AUTH_MESSAGE",
			payload: {
				message: error,
				showAuthMessage: true,
				authMessageVariant: "danger",
			},
		});
	}
};

export const upgradeGuestUserAccount = (
	firstName,
	lastName,
	email,
	password,
	phoneNumber
) => async (dispatch) => {
	try {
		//upgrade guest account to regular account
		const credential = await guestAuth.EmailAuthProvider.credential(
			email,
			password
		);
		await auth.currentUser.linkWithCredential(credential);

		//update user info in firebase
		const updateUserInfo = await auth.currentUser;
		await updateUserInfo.updateProfile({
			displayName: `${firstName} ${lastName}`,
		});

		//update user record in mongo
		const userToken = await getUserToken();
		await pitachip.put(
			"/user",
			{
				isAnonymous: false,
				metaData: {
					firstName,
					lastName,
					email,
					phoneNumber,
				},
			},
			{
				headers: { Authorization: `Bearer ${userToken.token}` },
			}
		);
	} catch (error) {
		dispatch({
			type: "SET_AUTH_MESSAGE",
			payload: {
				message: error.message,
				showAuthMessage: true,
				authMessageVariant: "danger",
			},
		});
	}
};

export const sendPasswordResetEmail = (email) => async (dispatch) => {
	try {
		const response = await pitachip.post("/auth/resetpassword", {
			email,
		});

		dispatch({
			type: "SET_AUTH_MESSAGE",
			payload: {
				message: response.data,
				showAuthMessage: true,
				authMessageVariant: "success",
			},
		});
	} catch (error) {
		if (error.includes("EMAIL_NOT_FOUND")) {
			dispatch({
				type: "SET_AUTH_MESSAGE",
				payload: {
					message: "No account exists with this email",
					showAuthMessage: true,
					authMessageVariant: "danger",
				},
			});
		} else {
			dispatch({
				type: "SET_AUTH_MESSAGE",
				payload: {
					message: error,
					showAuthMessage: true,
					authMessageVariant: "danger",
				},
			});
		}
	}
};

export const authStateChanged = (user, authLoadingFlag) => async (dispatch) => {
	let metaData = {};
	if (user) {
		const userToken = await getUserToken();
		const userMetaData = await pitachip.get(`/user/${user.uid}`, {
			headers: { Authorization: `Bearer ${userToken.token}` },
		});
		metaData = userMetaData.data[0].metaData;
		dispatch({
			type: "SET_USER",
			payload: {
				user: user,
				metaData: metaData ? metaData : {},
				authLoading: authLoadingFlag,
				errorMessage: "",
				showAuthErrorMessage: false,
			},
		});
	} else {
		dispatch({
			type: "SET_USER",
			payload: {
				user,
				metaData,
				authLoading: authLoadingFlag,
				errorMessage: "",
				showAuthErrorMessage: false,
			},
		});
	}
};

export const updateUserMetaData = (firstName, lastName, email) => async (
	dispatch
) => {
	try {
		//update user info in firebase
		const updateUserInfo = auth.currentUser;
		await updateUserInfo.updateProfile({
			displayName: `${firstName} ${lastName}`,
		});

		const userToken = await getUserToken();
		const updateMetaData = await pitachip.put(
			"/user",
			{
				metaData: {
					firstName,
					lastName,
					email,
				},
			},
			{
				headers: { Authorization: `Bearer ${userToken.token}` },
			}
		);

		const metaData = updateMetaData.data.metaData;
		const user = updateUserInfo;

		dispatch({
			type: "SET_USER",
			payload: {
				user,
				metaData,
				authLoading: false,
				errorMessage: "",
				showAuthErrorMessage: false,
			},
		});
	} catch (error) {
		return error;
	}
};

export const verifyUserPassword = (currentPassword) => async (dispatch) => {
	try {
		const user = auth.currentUser;
		const credential = authProvider.EmailAuthProvider.credential(
			auth.currentUser.email,
			currentPassword
		);
		const reauth = await user.reauthenticateWithCredential(credential);

		return reauth;
	} catch (error) {
		const errorMessage = createErrorMessage(error.code);
		dispatch({
			type: "SET_AUTH_MESSAGE",
			payload: {
				message: errorMessage,
				showAuthMessage: true,
				authMessageVariant: "danger",
			},
		});
	}
};

export const updateUserPassword = (newPassword) => async (dispatch) => {
	try {
		const currentUser = auth.currentUser;
		const userToken = await getUserToken();
		const updatePassword = await pitachip.put(
			"/auth/updatepassword",
			{
				uid: currentUser.uid,
				password: newPassword,
			},
			{
				headers: { Authorization: `Bearer ${userToken.token}` },
			}
		);
		return updatePassword;
	} catch (error) {
		console.log(error);
	}
};

export const setAuthMessage = (
	message,
	showAuthMessage,
	authMessageVariant
) => (dispatch) => {
	dispatch({
		type: "SET_AUTH_MESSAGE",
		payload: { message, showAuthMessage, authMessageVariant },
	});
};

/**TODO: might want to make some enums here or something */
export const setAuthFormToOpen = (form) => (dispatch) => {
	dispatch({ type: "SET_AUTH_FORM", payload: form });
};

/**TODO: Look into create a file for all the default error messages */
const createErrorMessage = (errorCode) => {
	switch (errorCode) {
		case "auth/email-already-exists":
			return "An account already exists with this email";
		case "auth/wrong-password":
			return "Invalid credentials entered, try again.";
		case "auth/user-not-found":
			return "Account not found. Make sure your email is correct.";
		case "auth/user-disabled":
			return "Too many sign-in attempts. Your account has been temporarily disabled. You can reset it by using the 'Forgot Password' tool or contacting the site administrator (info@pitachipphilly.com)";
		case "auth/too-many-requests":
			return "Too many sign-in attempts. Your account has been temporarily disabled. You can reset it by using the 'Forgot Password' tool or contacting the site administrator (info@pitachipphilly.com)";
		default:
			return "Authentication error, try again.";
	}
};
