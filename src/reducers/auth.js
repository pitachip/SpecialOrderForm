const INITIAL_STATE = {
	user: null,
	authLoading: true,
	errorMessage: "",
	showAuthErrorMessage: false,
	authForm: "",
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "USER_SIGNED_IN":
			return {
				...state,
				user: action.payload.user,
				authLoading: action.payload.authLoading,
				errorMessage: action.payload.errorMessage,
				showAuthErrorMessage: action.payload.errorMessage,
			};
		case "SET_AUTH_ERROR_MESSAGE":
			return {
				...state,
				errorMessage: action.payload.errorMessage,
				showAuthErrorMessage: action.payload.showAuthErrorMessage,
			};
		case "SET_AUTH_FORM":
			return { ...state, authForm: action.payload };
		default:
			return state;
	}
};
