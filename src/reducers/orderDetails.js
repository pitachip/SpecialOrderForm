const INITIAL_STATE = {
	orderDetails: [],
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "ADD_ORDER_ITEM":
			return {
				...state,
				orderDetails: [...state.orderDetails, action.payload],
			};
		default:
			return state;
	}
};
