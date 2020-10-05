const INITIAL_STATE = {
	user: null,
	authLoading: true,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "USER_SIGNED_IN":
			return {
				...state,
				user: action.payload.user,
				authLoading: action.payload.authLoading,
			};
		default:
			return state;
	}
};
