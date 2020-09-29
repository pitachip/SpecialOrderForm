const INITIAL_STATE = {
	orderDetails: [],
	totals: { subTotal: 0, tax: 0, delivery: 25, total: 0 },
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "ADD_ORDER_ITEM":
			return {
				...state,
				orderDetails: [...state.orderDetails, action.payload],
			};
		case "UPDATE_ORDER_TOTALS":
			return { ...state, totals: action.payload };
		default:
			return state;
	}
};
