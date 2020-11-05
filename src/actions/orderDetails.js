import update from "immutability-helper";
import findIndex from "lodash/findIndex";

export const addItemToOrder = (orderItem) => (dispatch) => {
	dispatch({ type: "ADD_ORDER_ITEM", payload: orderItem });
};

export const updateOrderItem = (orderItem, orderItems) => (dispatch) => {
	const indexOfUpdatedItem = findIndex(orderItems, {
		uniqueId: orderItem.uniqueId,
	});
	const newOrderItemsArray = update(orderItems, {
		[indexOfUpdatedItem]: { $set: orderItem },
	});
	dispatch({ type: "UPDATE_ORDER_ITEMS", payload: newOrderItemsArray });
};

export const deleteOrderItem = (orderItem, orderItems) => (dispatch) => {
	const indexofItemToDelete = findIndex(orderItems, {
		uniqueId: orderItem.uniqueId,
	});

	const newOrderItemsArray = update(orderItems, {
		$splice: [[indexofItemToDelete, 1]],
	});

	dispatch({ type: "DELETE_ORDER_ITEM", payload: newOrderItemsArray });
};

export const updateOrderTotals = (totals) => (dispatch) => {
	dispatch({ type: "UPDATE_ORDER_TOTALS", payload: totals });
};

export const updateShippingMethod = (method) => (dispatch) => {
	dispatch({ type: "UPDATE_SHIPPING_METHOD", payload: method });
};

export const updatePickupLocation = (location) => (dispatch) => {
	dispatch({ type: "UPDATE_PICKUP_LOCATION", payload: location });
};

export const updateSpecialInstructions = (specialInstructions) => (
	dispatch
) => {
	dispatch({
		type: "UPDATE_SPECIAL_INSTRUCTIONS",
		payload: specialInstructions,
	});
};

export const updateOrderDate = (orderDate) => (dispatch) => {
	dispatch({ type: "UPDATE_ORDER_DATE", payload: orderDate });
};

export const updateOrderDetails = (orderDetails) => (dispatch) => {
	dispatch({ type: "UPDATE_ORDER_DETAILS", payload: orderDetails });
};

export const updateDeliveryDetails = (deliveryDetails) => (dispatch) => {
	dispatch({ type: "UPDATE_DELIVERY_DETAILS", payload: deliveryDetails });
};

export const updatePaymentType = (paymentType) => (dispatch) => {
	dispatch({ type: "UPDATE_PAYMENT_TYPE", payload: paymentType });
};
