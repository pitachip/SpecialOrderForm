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

export const deleteAllOrderItems = () => (dispatch) => {
	dispatch({ type: "DELETE_ALL_ORDER_ITEMS" });
};

export const updateOrderTotals = (totals) => (dispatch) => {
	dispatch({ type: "UPDATE_ORDER_TOTALS", payload: totals });
};

export const updateShippingMethod = (method) => (dispatch) => {
	dispatch({ type: "UPDATE_SHIPPING_METHOD", payload: method });
};

export const updatePickupLocation = (location, storeInformation) => (
	dispatch
) => {
	const locationName = location;
	const indexOfSelectedStore = findIndex(
		storeInformation.locations,
		(location) => {
			return location.storeName === locationName;
		}
	);
	const pickupInformation = storeInformation.locations[indexOfSelectedStore];
	dispatch({
		type: "UPDATE_PICKUP_LOCATION",
		payload: {
			location,
			pickupInformation: {
				address1: pickupInformation ? pickupInformation.address1 : "",
				address2: pickupInformation ? pickupInformation.address2 : "",
				city: pickupInformation ? pickupInformation.city : "",
				state: pickupInformation ? pickupInformation.state : "",
				zip: pickupInformation ? pickupInformation.zip : "",
				phoneNumber: pickupInformation ? pickupInformation.phoneNumber : "",
				email: pickupInformation ? pickupInformation.email : "",
			},
		},
	});
};

export const updatePickupInstructions = (pickupInstructions) => (dispatch) => {
	dispatch({ type: "UPDATE_PICKUP_INSTRUCTIONS", payload: pickupInstructions });
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
