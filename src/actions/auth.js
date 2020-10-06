import { auth } from "../apis/firebase";

export const signInWithEmailAndPassword = (email, password) => async (
	dispatch
) => {
	try {
		const user = await auth.signInWithEmailAndPassword(email, password);
		console.log("User: ", user);
		dispatch({
			type: "USER_SIGNED_IN",
			payload: {
				user: user,
				authLoading: false,
				errorMessage: "",
				showAuthErrorMessage: false,
			},
		});
	} catch (error) {
		console.log("Error: ", error);
		const errorMessage = createErrorMessage(error.code);
		dispatch({
			type: "SET_AUTH_ERROR_MESSAGE",
			payload: { errorMessage: errorMessage, showAuthErrorMessage: true },
		});
	}
};

export const authStateChanged = (user, authLoadingFlag) => (dispatch) => {
	dispatch({
		type: "AUTH_STATE_CHANGED",
		payload: { user: user, authLoading: authLoadingFlag },
	});
};

export const setAuthErrorMessage = (errorMessage, showAuthErrorMessage) => (
	dispatch
) => {
	dispatch({
		type: "SET_AUTH_ERROR_MESSAGE",
		payload: { errorMessage: errorMessage, showAuthErrorMessage },
	});
};

/**TODO: might want to make some enums here or something */
export const setAuthFormToOpen = (form) => (dispatch) => {
	dispatch({ type: "SET_AUTH_FORM", payload: form });
};

/**TODO: Look into create a file for all the default error messages */
//cycle through the error messages
const createErrorMessage = (errorCode) => {
	switch (errorCode) {
		case "auth/wrong-password":
			return "Invalid credentials entered, try again.";
		case "auth/user-not-found":
			return "Account not found. Make sure your email is correct.";
		case "auth/user-disabled":
			return "Too many sign-in attempts. Your account has been temporarily disabled. You can reset it by using the 'Forgot Password' tool or contacting the site administrator (info@pitachipphilly.com)";
		case "auth/too-many-requests":
			return "Too many sign-in attempts. Your account has been temporarily disabled. You can reset it by using the 'Forgot Password' tool or contacting the site administrator (info@pitachipphilly.com)";
		default:
			return "Error signing into your account, try again.";
	}
};
