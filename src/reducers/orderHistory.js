const INITIAL_STATE = {
	orders: [],
	orderToModify: null,
	pagination: {},
	activeTab: 0,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_ORDER_HISTORY":
			return {
				...state,
				orders: action.payload.orders,
				pagination: action.payload.pagination,
			};
		case "SET_ORDER_TO_MODIFY":
			return {
				...state,
				orderToModify: action.payload,
			};
		case "SET_ACTIVE_TAB":
			return {
				...state,
				activeTab: action.payload,
			};
		case "persist/PURGE":
			return INITIAL_STATE;
		default:
			return state;
	}
};
