import { auth } from "../apis/firebase";

export const signInWithEmailAndPassword = (email, password) => async (
	dispatch
) => {
	const user = await auth.signInWithEmailAndPassword(email, password);
	console.log("User: ", user);
	dispatch({
		type: "USER_SIGNED_IN",
		payload: { user: user, authLoading: false },
	});
};

export const authStateChanged = (user, authLoadingFlag) => (dispatch) => {
	dispatch({
		type: "AUTH_STATE_CHANGED",
		payload: { user: user, authLoading: authLoadingFlag },
	});
};
