import pitachip from "../apis/pitachip";
export * from "./menu";
export * from "./orderDetails";
export * from "./storeInformation";

export const getSpecialOrders = () => async (dispatch, getState) => {
	console.log("Get Special orders called");
	const response = await pitachip.get("/specialorder");
	console.log(response);
};
