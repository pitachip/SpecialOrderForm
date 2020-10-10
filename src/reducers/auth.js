const INITIAL_STATE = {
	user: null,
	authLoading: true,
	errorMessage: "", // remove
	showAuthErrorMessage: false, //remove
	authForm: "",
	showAuthMessage: false,
	authMessage: "",
	authMessageVariant: null,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_USER":
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
		case "SET_AUTH_MESSAGE":
			return {
				...state,
				authMessage: action.payload.message,
				showAuthMessage: action.payload.showAuthMessage,
				authMessageVariant: action.payload.authMessageVariant,
			};
		case "SET_AUTH_FORM":
			return { ...state, authForm: action.payload };
		default:
			return state;
	}
};
