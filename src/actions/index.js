import pitachip from "../apis/pitachip";
export * from "./menu";

export const getSpecialOrders = () => async (dispatch, getState) => {
	console.log("Get Special orders called");
	const response = await pitachip.get("/specialorder");
	console.log(response);
};
