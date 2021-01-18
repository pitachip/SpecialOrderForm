const INITIAL_STATE = {
	rootUrl: "/",
	retrieveOrder: true,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_ROOT_URL":
			return {
				...state,
				rootUrl: action.payload,
			};
		case "SET_RETRIEVE_ORDER":
			return {
				...state,
				retrieveOrder: action.payload,
			};
		case "persist/PURGE":
			return INITIAL_STATE;
		default:
			return state;
	}
};
