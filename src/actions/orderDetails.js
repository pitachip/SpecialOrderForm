export const addItemToOrder = (orderItem) => (dispatch) => {
	dispatch({ type: "ADD_ORDER_ITEM", payload: orderItem });
};

export const updateOrderTotals = (totals) => (dispatch) => {
	dispatch({ type: "UPDATE_ORDER_TOTALS", payload: totals });
};

export const updateShippingMethod = (method) => (dispatch) => {
	dispatch({ type: "UPDATE_SHIPPING_METHOD", payload: method });
};

export const updateOrderDetails = (orderDetails) => (dispatch) => {
	dispatch({ type: "UPDATE_ORDER_DETAILS", payload: orderDetails });
};
