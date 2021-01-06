const INITIAL_STATE = {
	orders: [],
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_ORDER_HISTORY":
			return {
				...state,
				orders: action.payload,
			};
		case "persist/PURGE":
			return INITIAL_STATE;
		default:
			return state;
	}
};
