const INITIAL_STATE = {
	orders: [],
	orderToModify: null,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_ORDER_HISTORY":
			return {
				...state,
				orders: action.payload,
			};
		case "SET_ORDER_TO_MODIFY":
			return {
				...state,
				orderToModify: action.payload,
			};
		case "persist/PURGE":
			return INITIAL_STATE;
		default:
			return state;
	}
};
