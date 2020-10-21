import { auth } from "../apis/firebase";
import pitachip from "../apis/pitachip";

export const signInWithEmailAndPassword = (email, password) => async (
	dispatch
) => {
	try {
		const signInAttempt = await auth.signInWithEmailAndPassword(
			email,
			password
		);
		dispatch({
			type: "SET_USER",
			payload: {
				user: signInAttempt.user,
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
		console.log("Guest Sign in: ", guestSignInAttempt);
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
		}
	}
};

export const authStateChanged = (user, authLoadingFlag) => (dispatch) => {
	console.log("Auth state changed: ", user);
	dispatch({
		type: "SET_USER",
		payload: {
			user: user,
			authLoading: authLoadingFlag,
			errorMessage: "",
			showAuthErrorMessage: false,
		},
	});
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
