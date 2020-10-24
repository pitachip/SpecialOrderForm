const INITIAL_STATE = {
	orderItems: [],
	totals: { subTotal: 0, tax: 0, delivery: 0, total: 0 },
	orderDetails: {
		shippingMethod: "delivery",
		orderDate: "",
		location: "",
		specialRequests: "",
		deliveryInformation: {
			address1: "",
			address2: "",
			city: "",
			state: "",
			zip: "",
		},
	},
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "ADD_ORDER_ITEM":
			return {
				...state,
				orderItems: [...state.orderItems, action.payload],
			};
		case "UPDATE_ORDER_ITEMS":
			return { ...state, orderItems: action.payload };
		case "DELETE_ORDER_ITEM":
			return { ...state, orderItems: action.payload };
		case "UPDATE_ORDER_TOTALS":
			return { ...state, totals: action.payload };
		case "UPDATE_SHIPPING_METHOD":
			return { ...state, orderDetails: { shippingMethod: action.payload } };
		case "UPDATE_ORDER_DETAILS":
			return { ...state, orderDetails: action.payload };
		case "UPDATE_DELIVERY_DETAILS":
			return { ...state, orderDetails: { deliveryDetails: action.payload } };
		default:
			return state;
	}
};
