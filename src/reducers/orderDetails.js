const INITIAL_STATE = {
	orderItems: [],
	totals: { subTotal: 0, tax: 0, delivery: 0, total: 0 },
	orderDetails: {
		shippingMethod: "delivery",
		orderDate: new Date(),
		location: "",
		specialInstructions: "",
		pickupInformation: {
			address1: "",
			address2: "",
			city: "",
			state: "",
			zip: "",
			pickupInstructions: "",
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
			return {
				...state,
				orderDetails: {
					...state.orderDetails,
					shippingMethod: action.payload,
				},
			};
		case "UPDATE_PICKUP_LOCATION":
			return {
				...state,
				orderDetails: {
					...state.orderDetails,
					location: action.payload.location,
					pickupInformation: action.payload.pickupInformation,
				},
			};
		case "UPDATE_PICKUP_INSTRUCTIONS":
			return {
				...state,
				orderDetails: {
					...state.orderDetails,
					pickupInformation: {
						...state.orderDetails.pickupInformation,
						pickupInstructions: action.payload,
					},
				},
			};
		case "UPDATE_SPECIAL_INSTRUCTIONS":
			return {
				...state,
				orderDetails: {
					...state.orderDetails,
					specialInstructions: action.payload,
				},
			};
		case "UPDATE_ORDER_DATE":
			return {
				...state,
				orderDetails: {
					...state.orderDetails,
					orderDate: action.payload,
				},
			};
		case "UPDATE_ORDER_DETAILS":
			return { ...state, orderDetails: action.payload };
		case "UPDATE_DELIVERY_DETAILS":
			return {
				...state,
				orderDetails: {
					...state.orderDetails,
					deliveryDetails: action.payload,
				},
			};
		case "UPDATE_PAYMENT_TYPE":
			return {
				...state,
				paymentDetails: {
					...state.paymentDetails,
					paymentType: action.payload,
				},
			};
		case "persist/PURGE":
			return INITIAL_STATE;
		default:
			return state;
	}
};
