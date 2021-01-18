import pitachip from "../apis/pitachip";
export * from "./menu";
export * from "./orderDetails";
export * from "./storeInformation";
export * from "./auth";
export * from "./payment";
export * from "./orderHistory";
export * from "./navigation";

export const getSpecialOrders = () => async (dispatch, getState) => {
	console.log("Get Special orders called");
	const response = await pitachip.get("/specialorder");
	console.log(response);
};
