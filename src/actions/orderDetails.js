export const addItemToOrder = (orderItem) => (dispatch) => {
	dispatch({ type: "ADD_ORDER_ITEM", payload: orderItem });
};

export const updateOrderTotals = (totals) => (dispatch) => {
	dispatch({ type: "UPDATE_ORDER_TOTALS", payload: totals });
};
