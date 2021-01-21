import pitachip from "../apis/pitachip";
import { getUserToken } from "../utils/authUtils";

export const getMyOrders = () => async (dispatch) => {
	try {
		const userToken = await getUserToken();
		const orderHistory = await pitachip.get("/specialorder?sort=-createdAt", {
			headers: { Authorization: `Bearer ${userToken.token}` },
		});
		dispatch({ type: "SET_ORDER_HISTORY", payload: orderHistory.data });
	} catch (error) {
		console.log(error);
	}
};

export const getOrder = (orderID) => async (dispatch) => {
	try {
		const userToken = await getUserToken();
		const order = await pitachip.get(`/specialorder/${orderID}`, {
			headers: { Authorization: `Bearer ${userToken.token}` },
		});
		dispatch({ type: "SET_ORDER_TO_MODIFY", payload: order.data });
		return order.data;
	} catch (error) {
		throw error;
	}
};
