import pitachip from "../apis/pitachip";
export * from "./menu";
export * from "./orderDetails";
export * from "./storeInformation";
export * from "./auth";
export * from "./payment";
export * from "./orderHistory";
export * from "./navigation";
export * from "./account";

export const getSpecialOrders = () => async (dispatch, getState) => {
	const response = await pitachip.get("/specialorder");
};
