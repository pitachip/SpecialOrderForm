import pitachip from "../apis/pitachip";
import { getUserToken } from "../utils/authUtils";

export const getMyOrders = (page, filter) => async (dispatch) => {
	try {
		let queryFilter = filter;
		if (!queryFilter) {
			queryFilter = "";
		}
		const userToken = await getUserToken();
		const orderHistory = await pitachip.get(
			`/specialorder?sort=-createdAt&page=${page}&${queryFilter}`,
			{
				headers: { Authorization: `Bearer ${userToken.token}` },
			}
		);

		dispatch({
			type: "SET_ORDER_HISTORY",
			payload: {
				orders: orderHistory.data,
				pagination: orderHistory.pagination,
			},
		});
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
