const INITIAL_STATE = {
	user: null,
	metaData: {
		firstname: "",
		lastName: "",
	},
	authLoading: true,
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
				metaData: action.payload.metaData,
				authLoading: action.payload.authLoading,
				authMessage: action.payload.errorMessage,
				showAuthMessage: action.payload.errorMessage,
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
		case "SET_PROFILE_FIRSTNAME":
			return { ...state, metaData: { firstName: action.payload } };
		default:
			return state;
	}
};
